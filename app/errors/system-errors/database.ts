import { SystemError } from './system-error';

export type DatabaseErrorNames = 'READ_FAILED' | 'WRITE_FAILED' | 'FAILED_TO_INITIALLY_CONNECT' | 'MONGO_RUNTIME_ERROR';

export class DatabaseError extends SystemError<DatabaseErrorNames> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: DatabaseErrorNames;
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

