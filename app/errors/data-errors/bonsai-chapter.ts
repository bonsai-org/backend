import { DataError } from './data-errors';

export type BonsaiChapterServicesErrorNames =
    | 'WRITE_FAILED'
    | 'READ_FAILED'
    | 'DUPLICATE_KEY'

export class BonsaiChapterServicesError extends DataError<BonsaiChapterServicesErrorNames> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: BonsaiChapterServicesErrorNames;
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
