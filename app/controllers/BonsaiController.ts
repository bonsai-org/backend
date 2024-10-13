import { Request, Response, NextFunction } from 'express'
import { BonsaiFunctions, BonsaiChapterFunctions } from '../data'
import { Schema } from 'mongoose'
import { BonsaiJobs } from '../data'
import { StatusCodes } from 'http-status-codes'

class BonsaiController {

    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let {
                hardinessZone,
                height,
                width,
                nebari,
                style,
                species,
                geoLocation,
                chapters
            } = req.body
            let bonsai = BonsaiFunctions.constructBonsai({
                user: req.username,
                hardinessZone,
                height,
                width,
                nebari,
                style,
                species,
                geoLocation
            })
            let chapterModels = BonsaiChapterFunctions.constructChapters({
                chapterMetadata: chapters,
                bonsaiID: bonsai._id as Schema.Types.ObjectId,
                bonsaiPrivateHash: bonsai.privateHash,
                bonsaiPublicHash: bonsai.publicHash,
            })
            BonsaiFunctions.addPhotoNames({ bonsai, bonsaiChapters: chapterModels })
            await Promise.all([
                BonsaiChapterFunctions.saveChapters(chapterModels),
                BonsaiFunctions.saveBonsai(bonsai),
            ])
            await BonsaiJobs.newBonsai(
                {
                    bonsaiPublicHash: bonsai.publicHash,
                    numPhotos: bonsai.photoNames.length
                }
            )
            let signedUrls = await BonsaiChapterFunctions.generateLinks({
                imageNames: bonsai.photoNames
            })
            res.status(StatusCodes.OK).json({ signedUrls, publichHash: bonsai.publicHash, bonsai, chapterModels })
            return
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
        // construct a bonsai from user input 
        // construct chapter models from user input 
        // append photo names of each chapter in S3 to bonsai 
        // Save the bonsai and the chapters
        // add the bonsai job to the queue 
        // generate signed urls
        // send the urls and the publichash to the user 
    }

    confirmUpload = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { bonsaihash } = req.params
            await BonsaiJobs.promoteUploadJob({ bonsaiPublicHash: bonsaihash })
            res.sendStatus(StatusCodes.NO_CONTENT)
            return
        } catch (error) {
            next(error)
            return
        }
    }

}

export const BonsaiControllers = new BonsaiController()