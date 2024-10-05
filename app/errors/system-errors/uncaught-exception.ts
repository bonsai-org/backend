import { SystemError } from './system-error';

export type UnknownExceptionNames = 'UNCAUGHT_EXCEPTION';

export class UnknownException extends SystemError<UnknownExceptionNames> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: UnknownExceptionNames;
        message: string;
        stack: any;
    }) {
        super({
            name,
            message,
            stack,
        });
    }
}

