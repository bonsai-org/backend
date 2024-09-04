/// <reference types="../types/express.d.ts" />
import { __prod__ } from '../utils/constants'
import { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'
import { IUser } from '../types/schemas'
import { RefreshTokenData, AccessTokenData, NewlyGeneratedTokens, AuthorizedTokenData } from '../types'
import { AuthError } from '../errors/authError'
import * as jwt from 'jsonwebtoken'
import { InternalApiError } from '../errors/internalApiError'

const cookieOpts = {
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    path: "/",
    domain: __prod__ ? `.${process.env.DOMAIN}` : "",
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year 
} as const;

function getUserProperty(req: Request): IUser {
    if (req.user === undefined) {
        throw new InternalApiError({
            name: 'REQUEST_OBJECT_MISSING_PROPERTY',
            message: 'User object missing from request object when attempting to sign jwts'
        })
    }
    return req.user
}

function createAuthTokens(user: IUser): NewlyGeneratedTokens {
    let refreshToken = jwt.sign(
        { username: user.username, refreshTokenVersion: user.refreshToken },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "30d"
        }
    )
    let accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "5min"
        }
    )
    return { accessToken, refreshToken }
}

// We need either the accessToken or the refreshToken to continue. Supplying neither, will 
// result in a 401. 

export function getCookieValues(res: Response, req: Request, next: NextFunction) {
    let { id, rid } = req.cookies
    if (id === undefined && rid === undefined) {
        throw new AuthError({
            name: 'NO_TOKENS_SENT',
            message: 'User sent no tokens with request'
        })
    }
    return { accessToken: id, refreshToken: rid }
}

export function sendAuthTokens(req: Request, res: Response, next: NextFunction) {
    try {
        let user = getUserProperty(req)
        let { accessToken, refreshToken } = createAuthTokens(user)
        res.cookie("id", accessToken, cookieOpts)
        res.cookie("rid", refreshToken, cookieOpts)
    } catch (error) {
        next(error)
    }
}

export function clearAuthCookies(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("id", cookieOpts)
    res.clearCookie("rid", cookieOpts)
}

function verifyAccessToken(accessToken: string): AccessTokenData | null {
    try {
        let data = <AccessTokenData>(
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        )
        return {
            username: data.username
        }
    } catch (error) {
        return null
    }
}

function verifyRefreshToken(refreshToken: string): RefreshTokenData {
    try {
        let data = <RefreshTokenData>(
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        )
        return data
    } catch (error) {
        throw new AuthError({
            name: 'INVALID_REFRESH_TOKEN',
            message: 'User failed to provide valid tokens and therefore their request must be denied ;-('
        })
    }
}

/* 
 * Here is the flow of whats happening with checkTokens
 *  
 * NOTE!!! If we are able to verify an accessToken, checkTokens will only return a username. 
 * If we end up having to verify a refreshToken, then checkTokens will return the username 
 * along with the full user record!
 * 
 * 1. First verify accessToken and return the username from the accessToken if it is valid
 * 2. If accessToken is invalid, then first make sure that the user supplied a refreshToken. If there is no refresh
 *    token supplied, then throw an error and immediately send a 401 to the client. If the client did supply
 *    a refreshToken, then attempt to verify it. If you are unable to verify it, return a 401. 
 * 3. If the refreshToken is valid, we will then have to make sure that the token's version matches the version
 *    that is saved on the user record. To do this, we have to query the user's record from our db with the username 
 *    that is supplied via the JWT. If the two versions don't match, then we will have to send a 401. 
 * 4. If all of these check out, we can then return the username and the user record. 
 * 
 * 
 * What still needs to be addressed
 *  - I am not currently handling a potential mongoError within checkTokens 
 * 
*/

export async function checkTokens(accessToken: string, refreshToken: string): Promise<AuthorizedTokenData> {
    let accessTokenData = verifyAccessToken(accessToken)
    if (accessTokenData) { return accessTokenData }
    if (!refreshToken) {
        throw new AuthError({
            name: 'MISSING_REFRESH_TOKEN',
            message: 'No refresh token given after access token failed'
        })
    }
    let refreshTokenData = verifyRefreshToken(refreshToken)
    let { user, error } = await User.findByUsername(refreshTokenData.username)
    if (user === null) {
        throw new AuthError({
            name: 'USER_NOT_FOUND_FROM_REFRESH',
            message: 'Unable to find user with username supplied via refresh token'
        })
    }
    else if (refreshTokenData.refreshTokenVersion !== user.refreshToken) {
        throw new AuthError({
            name: 'REFRESH_TOKEN_VERSION_MISMATCH',
            message: 'User has supplied an outdated refresh token'
        })
    }
    return {
        username: user.username,
        user,
    }
}