export class QueryError<T extends string> extends Error {
    name: T;
    message: string;
    stack: any;
    level: 'INFO';

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
        this.level = 'INFO'
    }
}