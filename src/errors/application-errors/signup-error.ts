import { BaseError } from '../baseError'
import { LogLevels } from '../../types'

type ErrorName =
    | 'USERNAME_IN_USE'
    | 'EMAIL_IN_USE'
    | 'USERNAME_AND_EMAIL_IN_USE'
    | 'INTERNAL_API_ERROR'
    | 'PASSWORD_HASH_ERROR'
    | 'MISSING_REQUIRED_FIELDS';

export class SignUpError extends BaseError<ErrorName> {
    constructor({
        name,
        message,
        stack,
        level,
    }: {
        name: ErrorName,
        message: string,
        stack?: any,
        level: LogLevels,
    }) {
        super({
            name,
            message,
            stack,
            level
        })
    }
}