import { LogLevels } from "../types";

export class SystemError<T extends string> extends Error {
    name: T;
    message: string;
    stack: any;
    level: LogLevels;

    constructor({
        name,
        message,
        stack,
    }: {
        name: T;
        message: string;
        stack: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.stack = stack;
        this.level = 'Fatal'
    }
}

export { DatabaseError, DatabaseErrorNames } from './database'
export { EnvironmentError, EnvironmentErrorNames } from './environment'
export { UnknownException, UnknownExceptionNames } from './uncaught-exception'