import { QueryError } from './QueryError';

export type UserQueryErrorNames =
    | 'USER_NOT_FOUND'
    | 'USER_FOUND'

export class UserQuery extends QueryError<UserQueryErrorNames> {

    constructor({
        name,
        message,
        stack,
    }: {
        name: UserQueryErrorNames;
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
