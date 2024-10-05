import { LogLevels } from "../types";

export class DataError<T extends string> extends Error {
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
        stack?: any;
    }) {
        super();
        this.name = name;
        this.message = message;
        this.stack = stack;
        this.level = 'Info'
    }
}

export { UserError, UserErrorNames } from './user'