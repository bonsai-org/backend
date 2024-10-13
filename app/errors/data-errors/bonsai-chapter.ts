import { DataError } from './data-errors';

export type BonsaiChapterErrorNames =
    | 'WRITE_FAILED'
    | 'READ_FAILED'
    | 'DUPLICATE_KEY'

export class BonsaiChapterError extends DataError<BonsaiChapterErrorNames> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: BonsaiChapterErrorNames;
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
