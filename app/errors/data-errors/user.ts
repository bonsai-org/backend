import { DataError } from './data-errors';

export type UserErrorNames =
    | 'USER_EXISTS'
    | 'USER_DOES_NOT_EXIST'
    | 'DUPLICATE_KEY'

export class UserError extends DataError<UserErrorNames> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: UserErrorNames;
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
