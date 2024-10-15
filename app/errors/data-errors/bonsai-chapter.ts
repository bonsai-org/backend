import { DataError } from './data-errors';

export type BonsaiChapterServicesErrorNames =
    | 'FAILED_TO_GENERATE_LINKS'

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
