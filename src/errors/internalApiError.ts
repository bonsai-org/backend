import { BaseError } from './baseError';

type ErrorName =
    | 'REQUEST_OBJECT_MISSING_PROPERTY'
    | 'BCRYPT_ERROR'

export class InternalApiError extends BaseError<ErrorName> {
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
            level: 'Fatal',
        });
    }
}
