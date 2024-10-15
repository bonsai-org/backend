import { QueryError } from './QueryError';

export type BonsaiQueryErrorNames =
    | 'BONSAI_NOT_FOUND'
    | 'BONSAI_FOUND'

export class BonsaiQuery extends QueryError<BonsaiQueryErrorNames> {

    constructor({
        name,
        message,
        stack,
    }: {
        name: BonsaiQueryErrorNames;
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
