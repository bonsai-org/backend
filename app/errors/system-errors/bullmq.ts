import { SystemError } from './system-error';

export type BullMQErrorNames = 'FAILED_TO_CREATE_JOB' | 'FAILED_TO_FIND_JOB' | 'FAILED_TO_PROMOTE_JOB' | 'JOB_FAILED'

export class BullMQError extends SystemError<BullMQErrorNames> {
    constructor({
        name,
        message,
        stack,
    }: {
        name: BullMQErrorNames;
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

