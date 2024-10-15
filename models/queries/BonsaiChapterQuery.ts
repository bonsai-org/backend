import { BonsaiChapterModel } from "../bonsaiChapter"
import { QueryErrors } from "../queries/errors"
import { BonsaiChapterDocument, BonsaiDocument } from '../types'
import { FilterQuery } from "mongoose"


class BonsaiChapterQueries {

    // private async getQuery(
    //     query: FilterQuery<BonsaiDocument>,
    //     methodName: any,
    // ): Promise<BonsaiDocument> {
    //     try {
    //         let bonsai = await BonsaiChapterModel.findOne(query)
    //         if (!bonsai) {
    //             throw new QueryErrors.BonsaiQuery({
    //                 name: 'BONSAI_NOT_FOUND',
    //                 message: `Bonsai does not exist when executing ${methodName}`
    //             })
    //         }
    //         return bonsai
    //     } catch (error) {
    //         if (error instanceof QueryErrors.BonsaiQuery) { throw error }
    //         throw new QueryErrors.UncaughtError({
    //             name: 'UNCAUGHT_ERROR',
    //             message: `Read failed in BonsaiChapterQueries.${methodName}`,
    //             stack: error,
    //         });
    //     }
    // }

    async getAssociatedBonsai(
        bonsais: BonsaiDocument[]
    ): Promise<any> {
        let blob = {}
        let bonsaiChapters = await Promise.all(
            bonsais.map((bonsai) => {
                return BonsaiChapterModel.find(
                    { bonsai: bonsai._id }
                )
            })
        )
        return bonsaiChapters
    }

}

export const BonsaiChapterQuery = new BonsaiChapterQueries()