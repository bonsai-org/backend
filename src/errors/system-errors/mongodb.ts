import { SystemError } from './system-error';

type ErrorName = 'FAILED_TO_SAVE_NEW_USER' | 'FAILED_TO_LOOK_UP_EXISTING_USER' | 'READ_FAILED' | 'WRITE_FAILED';

export class MongoError extends SystemError<ErrorName> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: ErrorName;
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
