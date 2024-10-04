import { LogLevels } from "./types";

type ErrorName =
    | 'BCRYPT'

export class ThirdPartyError extends Error {
    name: ErrorName;
    message: string;
    stack: any;
    level: LogLevels;

    constructor({
        name,
        message,
        stack,
    }: {
        name: ErrorName;
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
