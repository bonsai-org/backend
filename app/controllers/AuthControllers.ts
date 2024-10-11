import { UserFunctions, UserQuery } from '../data'
import { Request, Response, NextFunction } from 'express'
import { JWTFunctions } from '../middleware'
import { StatusCodes } from 'http-status-codes'
import { Errors } from '../errors'
import { compare } from 'bcrypt'

class AuthController {
    signup = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let {
                username,
                password,
                email,
            } = req.body
            let newUser = await UserFunctions.createUser({
                username,
                plainTextPassword: password,
                email
            })
            JWTFunctions.sendAuthTokens(res, newUser)
            res.status(StatusCodes.OK).json({ username, profilePhoto: '' })
            return
        } catch (error) {
            if (error instanceof Errors.DataError.UserError) {
                if (error.name === 'DUPLICATE_KEY' && error.duplicateKey) {
                    res.status(StatusCodes.CONFLICT).json({ duplicateKey: error.duplicateKey })
                    return
                }
            }
            if (
                error instanceof Errors.ThirdPartyError.BcryptError ||
                error instanceof Errors.SystemError.DatabaseError
            ) {
                next(error)
                return
            }
            next(error)
        }
    }

    login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let { username, password } = req.body
            let user = await UserQuery.getByUsername({
                username
            })
            let validPassword = await compare(password, user.password)
            if (!validPassword) {
                throw new Errors.DataError.UserError({
                    name: 'INVALID_CREDENTIAL',
                    message: `Invalid password supplied by ${username} at login`
                })
            }
            JWTFunctions.sendAuthTokens(res, user)
            res.status(StatusCodes.OK).json({ username, profilePhoto: '' })
            return
        } catch (error) {
            if (error instanceof Errors.DataError.UserError) {
                if (error.name === 'USER_DOES_NOT_EXIST') {
                    res.sendStatus(StatusCodes.NOT_FOUND)
                    return
                }
                if (error.name === 'INVALID_CREDENTIAL') {
                    res.sendStatus(StatusCodes.UNAUTHORIZED)
                    return
                }
            }
            if (error instanceof Errors.SystemError.DatabaseError) {
                next(error)
                return
            }
            next(error)
        }
    }

    startUp = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(StatusCodes.OK).json({ username: req.username, profilePhoto: '' })
        return
    }

    logout = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            let { username } = req.body
            await UserFunctions.incrementRefreshToken({ username })
            JWTFunctions.clearAuthTokens(res)
            res.status(StatusCodes.RESET_CONTENT).json({ loggedOut: true })
            return
        } catch (error) {
            next(error)
        }
    }
}

export const AuthControllers = new AuthController()