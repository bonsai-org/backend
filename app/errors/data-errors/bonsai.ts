import { DataError } from './data-errors';

export type BonsaiServicesErrorNames =
    | 'WRITE_FAILED'
    | 'READ_FAILED'
    | 'DUPLICATE_KEY'
    | 'BONSAI_DOES_NOT_EXIST'
    | 'FAILED_TO_UPDATE_FIELD'

export class BonsaiServicesError extends DataError<BonsaiServicesErrorNames> {
    duplicateKey?: string

    constructor({
        name,
        message,
        stack,
        duplicateKey,
    }: {
        name: BonsaiServicesErrorNames;
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
