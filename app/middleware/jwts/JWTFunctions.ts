import { UserQuery } from "../../../models/queries/UserQuery";
import { Errors } from "../../errors";
import { UserDocument } from "../../../models/types";
import { AccessTokenData, AuthorizedTokenData, NewlyGeneratedTokens, RefreshTokenData } from '../types'
import { Response } from "express";
import * as jwt from 'jsonwebtoken';

class JWTHelpers {
    private cookieOpts = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'prod' ? `.${process.env.DOMAIN}` : '',
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    } as const;

    private clearCookieOpts = {
        // remove maxAge field
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'lax',
        path: '/',
        domain: process.env.NODE_ENV === 'prod' ? `.${process.env.DOMAIN}` : '',
    } as const

    private createAuthTokens(user: UserDocument): NewlyGeneratedTokens {
        try {
            let refreshToken = jwt.sign(
                { username: user.username, refreshTokenVersion: user.refreshToken },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '30d',
                },
            );
            let accessToken = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '5min',
                },
            );
            return { accessToken, refreshToken };
        } catch (error) {
            throw new Errors.ThirdPartyError.JWTError({
                name: 'SIGNING_ERROR',
                message: 'An error occured while trying to sign new JWTs',
                stack: error,
            })
        }
    }

    private verifyAccessToken(accessToken: string): AccessTokenData | null {
        try {
            let data = <AccessTokenData>(
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            );
            return {
                username: data.username,
            };
        } catch (error) {
            if (
                error instanceof jwt.TokenExpiredError ||
                error instanceof jwt.JsonWebTokenError
            ) { return null }
            throw new Errors.ThirdPartyError.JWTError({
                name: 'SIGNING_ERROR',
                message: 'An error occured while signing a JWT',
                stack: error
            })
        }
    }

    private verifyRefreshToken(refreshToken: string): RefreshTokenData | null {
        try {
            let data = <RefreshTokenData>(
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            );
            return data;
        } catch (error) {
            if (
                error instanceof jwt.TokenExpiredError ||
                error instanceof jwt.JsonWebTokenError
            ) { return null }
            throw new Errors.ThirdPartyError.JWTError({
                name: 'SIGNING_ERROR',
                message: 'An error occured while signing a JWT',
                stack: error
            })
        }
    }

    async verifyTokens(accessToken: string, refreshToken: string, res: Response): Promise<AuthorizedTokenData> {
        let accessTokenData = this.verifyAccessToken(accessToken)
        if (accessTokenData) { return accessTokenData }
        if (!refreshToken) {
            throw new Errors.DataError.UserServicesError({
                name: 'INVALID_CREDENTIAL',
                message: 'No refresh token provided'
            })
        }
        let refreshTokenData = this.verifyRefreshToken(refreshToken)
        if (!refreshTokenData) {
            throw new Errors.DataError.UserServicesError({
                name: 'INVALID_CREDENTIAL',
                message: 'Failed to verify refresh token'
            })
        }
        let user = await UserQuery.getByUsername({ username: refreshTokenData.username })
        if (!user) {
            throw new Errors.DataError.UserServicesError({
                name: 'USER_DOES_NOT_EXIST',
                message: 'Failed to lookup user from supplied JWT'
            })
        }
        else if (user.refreshToken !== refreshTokenData.refreshTokenVersion) {
            throw new Errors.DataError.UserServicesError({
                name: 'INVALID_CREDENTIAL',
                message: 'User provided an expired JWT'
            })
        }
        this.sendAuthTokens(res, user)
        return {
            username: user.username,
            user: user
        }
    }

    sendAuthTokens(res: Response, user: UserDocument) {
        let { accessToken, refreshToken } = this.createAuthTokens(user)
        res.cookie('id', accessToken, this.cookieOpts)
        res.cookie('rid', refreshToken, this.cookieOpts)
    }

    clearAuthTokens(res: Response) {
        res.clearCookie('id', this.clearCookieOpts)
        res.clearCookie('rid', this.clearCookieOpts)
    }
}

export const JWTFunctions = new JWTHelpers()