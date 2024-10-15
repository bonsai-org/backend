import { QueryError } from './QueryError';

export type BonsaiChapterQueryErrorNames =
    | 'USER_NOT_FOUND'
    | 'USER_FOUND'

export class BonsaiChapterQuery extends QueryError<BonsaiChapterQueryErrorNames> {

    constructor({
        name,
        message,
        stack,
    }: {
        name: BonsaiChapterQueryErrorNames;
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
