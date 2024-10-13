import { BonsaiModel } from '../../../models/bonsai'
import { v4 as uuidv4 } from 'uuid';
import { BonsaiChapterDocument, BonsaiDocument } from '../types';
import { Errors, MongoServerErrorCodes } from '../../errors';

class BonsaiService {


    private extractDuplicateKey(mongoError: any) {
        return Object.keys(mongoError.errorResponse.keyValue)[0]
    }

    constructBonsai(queryParams: {
        user: string,
        hardinessZone: string,
        height?: number,
        width?: number,
        nebari?: number,
        style?: string,
        species: string,
        geoLocation: string
    }): BonsaiDocument {
        let bonsai = new BonsaiModel({
            hardiness_zone: queryParams.hardinessZone,
            species: queryParams.species,
            geoLocation: queryParams.geoLocation,
            user: queryParams.user,
            uploaded: false,
            privateHash: uuidv4(),
            publicHash: uuidv4(),
            bonsaiChapters: [],
        })
        if (queryParams.height) { bonsai.height = queryParams.height }
        if (queryParams.width) { bonsai.width = queryParams.width }
        if (queryParams.nebari) { bonsai.nebari = queryParams.nebari }
        if (queryParams.style) { bonsai.style = queryParams.style }
        return bonsai
    }

    addPhotoNames(
        params: {
            bonsai: BonsaiDocument,
            bonsaiChapters: BonsaiChapterDocument[],
        }
    ): BonsaiDocument {
        params.bonsai.photoNames = params.bonsaiChapters.map((chapter) => {
            return chapter.photoName
        })
        return params.bonsai
    }

    async saveBonsai(bonsai: BonsaiDocument): Promise<BonsaiDocument> {
        try {
            await bonsai.save()
            console.log(bonsai)
            return bonsai
        } catch (error: any) {
            if (
                error &&
                error.code === MongoServerErrorCodes.DuplicateKey
            ) {
                throw new Errors.DataError.BonsaiError({
                    name: 'DUPLICATE_KEY',
                    message: `Attempted to create new bonsai with duplicate key: ${this.extractDuplicateKey(error)}`
                })
            }
            throw new Errors.SystemError.DatabaseError({
                name: 'WRITE_FAILED',
                message: 'Write failed in Bonsai.createBonsai',
                stack: error
            })
        }
    }
}

export const BonsaiFunctions = new BonsaiService()