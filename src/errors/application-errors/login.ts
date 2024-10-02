import { ApplicationError } from './application-error';

type ErrorName =
    | 'NON_EXISTENT_USER'
    | 'INVALID_PASSWORD'
    | 'INTERNAL_API_ERROR'
    | 'MISSING_REQUIRED_FIELDS';

export class LoginError extends ApplicationError<ErrorName> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: ErrorName;
        message: string;
        stack?: any;
    }) {
        super({
            name,
            message,
            stack,
        });
    }
}
