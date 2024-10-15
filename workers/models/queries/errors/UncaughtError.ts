import { QueryError } from './QueryError';

export type UncaughtErrorNames =
    | 'UNCAUGHT_ERROR'

export class UncaughtError extends QueryError<UncaughtErrorNames> {

    constructor({
        name,
        message,
        stack,
    }: {
        name: UncaughtErrorNames;
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
