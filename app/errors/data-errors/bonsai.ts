import { DataError } from './data-errors';

export type BonsaiErrorNames =
    | 'WRITE_FAILED'
    | 'READ_FAILED'
    | 'DUPLICATE_KEY'

export class BonsaiError extends DataError<BonsaiErrorNames> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: BonsaiErrorNames;
        message: string;
        stack?: any;
        duplicateKey?: string,
    }) {
        super({
            name,
            message,
            stack,
        });
        this.duplicateKey = duplicateKey
    }
}
