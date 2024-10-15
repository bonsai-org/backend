import { Request, Response, NextFunction } from 'express'
import { BonsaiFunctions, BonsaiChapterFunctions } from '../data'
import { Schema, startSession } from 'mongoose'
import { BonsaiJobs } from '../data'
import { StatusCodes } from 'http-status-codes'
import { BonsaiQuery } from '../../models/queries/BonsaiQuery'
import { BonsaiChapterQuery } from '../../models/queries/BonsaiChapterQuery'

class BonsaiController {

    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let {
                geoLocation,
                hardinessZone,
                style,
                height,
                nebari,
                species,
                width,
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
            let newChapters = BonsaiChapterFunctions.constructChapters({
                chapterMetadata: chapters,
                bonsaiID: bonsai._id as Schema.Types.ObjectId,
                bonsaiPublicHash: bonsai.publicHash,
                bonsaiPrivateHash: bonsai.privateHash,
            })
            let results = await Promise.all([
                BonsaiChapterFunctions.saveChapters(newChapters),
                BonsaiFunctions.saveBonsai(bonsai),
                BonsaiJobs.newBonsai(
                    {
                        bonsaiPublicHash: bonsai.publicHash,
                    }
                ),
                BonsaiChapterFunctions.generateLinks({
                    chapters: newChapters,
                })
            ])
            let signedUrls = results[results.length - 1]
            res.json({ bonsaiPublicHash: bonsai.publicHash, signedUrls })
        } catch (error) {
            next(error)
        }
    }

    gib = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            let bonsai = await BonsaiQuery.getAtMost10()
            let bonsaiChapters = await BonsaiChapterQuery.getAssociatedBonsai(bonsai)
            console.log(bonsai)
            console.log(bonsaiChapters)
            res.json(bonsai)
        } catch (error) {
            next(error)
        }
    }

    // create = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) => {
    //     const session = await startSession();
    //     try {
    //         session.startTransaction();
    //         let {
    //             hardinessZone,
    //             height,
    //             width,
    //             nebari,
    //             style,
    //             species,
    //             geoLocation,
    //             chapters
    //         } = req.body
    //         let bonsai = BonsaiFunctions.constructBonsai({
    //             user: req.username,
    //             hardinessZone,
    //             height,
    //             width,
    //             nebari,
    //             style,
    //             species,
    //             geoLocation
    //         })
    //         let chapterModels = BonsaiChapterFunctions.constructChapters({
    //             chapterMetadata: chapters,
    //             bonsaiID: bonsai._id as Schema.Types.ObjectId,
    //             bonsaiPrivateHash: bonsai.privateHash,
    //             bonsaiPublicHash: bonsai.publicHash,
    //         })
    //         BonsaiFunctions.addPhotoNames({ bonsai, bonsaiChapters: chapterModels })
    //         const results = await Promise.all([
    //             BonsaiChapterFunctions.saveChapters(chapterModels),
    //             BonsaiFunctions.saveBonsai(bonsai),
    //             BonsaiJobs.newBonsai(
    //                 {
    //                     bonsaiPublicHash: bonsai.publicHash,
    //                     numPhotos: bonsai.photoNames.length
    //                 }
    //             ),
    //             BonsaiChapterFunctions.generateLinks({
    //                 imageNames: bonsai.photoNames
    //             })
    //         ])
    //         let signedUrls = results[results.length - 1]
    //         await session.commitTransaction()
    //         res.status(StatusCodes.OK).json({ signedUrls, publicHash: bonsai.publicHash })
    //         return
    //     } catch (error) {
    //         await session.abortTransaction()
    //         next(error)
    //     }
    // }

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