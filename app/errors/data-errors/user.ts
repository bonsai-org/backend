import { DataError } from './data-errors';

export type UserServicesErrorNames =
    | 'USER_EXISTS'
    | 'USER_DOES_NOT_EXIST'
    | 'DUPLICATE_KEY'
    | 'INVALID_CREDENTIAL'
    | 'UNABLE_TO_UPDATE_USER_FIELD'

export class UserServicesError extends DataError<UserServicesErrorNames> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: UserServicesErrorNames;
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
