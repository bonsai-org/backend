import { BonsaiModel } from "../bonsai"
import { QueryErrors } from "../queries/errors"
import { BonsaiDocument } from '../types'
import { FilterQuery } from "mongoose"


class BonsaiQueries {

    private async getQuery(
        query: FilterQuery<BonsaiDocument>,
        methodName: any,
    ): Promise<BonsaiDocument> {
        try {
            let bonsai = await BonsaiModel.findOne(query)
            if (!bonsai) {
                throw new QueryErrors.BonsaiQuery({
                    name: 'BONSAI_NOT_FOUND',
                    message: `Bonsai does not exist when executing ${methodName}`
                })
            }
            return bonsai
        } catch (error) {
            if (error instanceof QueryErrors.BonsaiQuery) { throw error }
            throw new QueryErrors.UncaughtError({
                name: 'UNCAUGHT_ERROR',
                message: `Read failed in BonsaiQueries.${methodName}`,
                stack: error,
            });
        }
    }

    private async publicHash(
        queryParams: { publicHash: string }
    ): Promise<BonsaiDocument> {
        let { publicHash } = queryParams
        return this.getQuery(
            { publicHash },
            this.publicHash
        )
    }

    async getByPublicHash(
        queryParams: { publicHash: string }
    ): Promise<BonsaiDocument> {
        let { publicHash } = queryParams
        let bonsai = await this.publicHash({ publicHash })
        if (!bonsai) {
            throw new QueryErrors.BonsaiQuery({
                name: 'BONSAI_NOT_FOUND',
                message: `Unable to locate bonsai with given publicHash: ${publicHash}`
            })
        }
        return bonsai

    }

}

export const BonsaiQuery = new BonsaiQueries()