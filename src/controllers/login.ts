import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import { HttpStatusCode, LoginRequest } from '../types'
import { LoginError } from '../errors/application-errors/login-error'
import { IUser } from '../types/schemas'
import { compare } from 'bcrypt'

function getLoginVariables(req: Request): LoginRequest {
    let loginRequest = req.loginRequest
    if (
        !loginRequest ||
        !loginRequest.username ||
        !loginRequest.password
    ) {
        throw new LoginError({
            name: 'MISSING_REQUIRED_FIELDS',
            message: 'Missing required body fields',
            level: 'Fatal'
        })
    }
    return {
        username: loginRequest.username,
        password: loginRequest.password,
    }
}

async function checkIfUserExists(username: string): Promise<IUser> {
    let { user, error } = await User.findByUsername(username)
    if (error) {
        throw new LoginError({
            name: 'INTERNAL_API_ERROR',
            message: 'An error occured while querying for user',
            level: 'Fatal',
            stack: error
        })
    }
    if (user === null) {
        throw new LoginError({
            name: 'NON_EXISTENT_USER',
            message: `No user exists with given username ${username}`,
            level: 'Info',
        })
    }
    return user
}

async function validatePassword(plainTextPassword: string, hashedPassword: string, username: string): Promise<void> {
    let validPassword = await compare(plainTextPassword, hashedPassword)
    if (!validPassword) {
        throw new LoginError({
            name: 'INVALID_PASSWORD',
            message: `${username} supplied an invalid password`,
            level: 'Info'
        })
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        let { username, password } = getLoginVariables(req)
        let user = await checkIfUserExists(username)
        await validatePassword(password, user.password, user.username)
        return res.sendStatus(200)
    } catch (error) {
        if (error instanceof LoginError) {
            console.log(error.message)
            if (
                error.name === 'INVALID_PASSWORD' ||
                error.name === 'NON_EXISTENT_USER'
            ) {
                return res.sendStatus(HttpStatusCode.Unauthorized)
            } else if (
                error.name === 'INTERNAL_API_ERROR' ||
                error.name === 'MISSING_REQUIRED_FIELDS'
            ) {
                next(error)
            }
        }
        next(error)
    }
}