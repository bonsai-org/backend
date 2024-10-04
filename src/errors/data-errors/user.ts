import { DataError } from './data-errors';

type ErrorName =
    | 'USER_EXISTS'
    | 'USER_DOES_NOT_EXIST'
    | 'DUPLICATE_KEY'

export class UserError extends DataError<ErrorName> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: ErrorName;
        message: string;
        stack?: any;
        duplicateKey?: string,
    }) {
        super({
            name,
            message,
            stack,
        });
        this.duplicateKey = duplicateKey
    }
}
