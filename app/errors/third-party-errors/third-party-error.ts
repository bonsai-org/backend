import { LogLevels } from "../types";

export class ThirdPartyError<T extends string> extends Error {
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
        this.level = 'Warn'
    }
}

export { BcryptError, BcryptErrorNames } from './bcrypt'