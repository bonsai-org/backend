import { StatusCodes } from "http-status-codes"
import { Errors } from "../../errors"
import { JWTFunctions } from "./JWTFunctions"
import { Request, Response, NextFunction } from 'express'
import { UserQuery } from "../../data"

class JWTMiddlewares {
    private getCookieValues(req: Request) {
        let { id, rid } = req.cookies
        if (!id && !rid) {
            throw new Errors.DataError.UserError({
                name: 'INVALID_CREDENTIAL',
                message: 'User did not supply an access token or a refresh token'
            })
        }
        return { accessToken: id, refreshToken: rid }
    }

    authenticate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let { accessToken, refreshToken } = this.getCookieValues(req)
            let { username } = await JWTFunctions.verifyTokens(accessToken, refreshToken, res)
            req.username = username
            next()
            return
        } catch (error) {
            console.log(error)
            if (error instanceof Errors.DataError.UserError) {
                if (
                    error.name === 'USER_DOES_NOT_EXIST' ||
                    error.name === 'INVALID_CREDENTIAL'
                ) {
                    res.sendStatus(StatusCodes.UNAUTHORIZED)
                    return
                }
            }
            next(error)
        }
    }

    authenticateWithUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let { accessToken, refreshToken } = this.getCookieValues(req)
            let { username, user } = await JWTFunctions.verifyTokens(accessToken, refreshToken, res)
            if (!user) {
                user = await UserQuery.getByUsername({ username })
                if (!user) {
                    throw new Errors.DataError.UserError({
                        name: 'USER_DOES_NOT_EXIST',
                        message: 'Failed to query user from JWT data'
                    })
                }
            }
            req.username = username
            req.user = user
            next()
            return
        } catch (error) {
            if (error instanceof Errors.DataError.UserError) {
                if (
                    error.name === 'USER_DOES_NOT_EXIST' ||
                    error.name === 'INVALID_CREDENTIAL'
                ) {
                    res.sendStatus(StatusCodes.UNAUTHORIZED)
                    return
                }
            }
            next(error)
        }
    }
}

export const JWTMiddleWare = new JWTMiddlewares()