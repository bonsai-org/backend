import { Request, Response, NextFunction } from 'express'
import { BonsaiFunctions, BonsaiChapterFunctions } from '../data'
import { Schema } from 'mongoose'
import { BonsaiQueue } from '../bin/bullmq'
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
            await BonsaiQueue.add(
                bonsai.privateHash,
                {
                    username: req.username,
                    expectedPhotos: chapterModels.length
                },
                {
                    delay: 120000,
                    jobId: bonsai.privateHash
                }
            )
            let signedUrls = await BonsaiChapterFunctions.generateLinks({
                imageNames: bonsai.photoNames
            })
            res.status(StatusCodes.OK).json({ signedUrls, privateHash: bonsai.privateHash })
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
        // send the urls and the privatehash to the user 
    }

    confirmUpload = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { bonsaihash } = req.params
            const job = await BonsaiQueue.getJob(bonsaihash);

            if (!job) {
                // Job not found
                res.status(StatusCodes.NOT_FOUND).json({ error: 'Job not found' });
                return;
            }

            // Get the current state of the job
            const state = await job.getState();

            if (state === 'delayed') {
                // Promote the job to be processed immediately
                await job.promote();

                res.status(StatusCodes.OK).json({ message: 'Job promoted to be processed immediately.' });
            } else if (state === 'waiting' || state === 'active') {
                res.status(StatusCodes.OK).json({ message: 'Job is already in progress.' });
            } else if (state === 'completed') {
                res.status(StatusCodes.OK).json({ message: 'Job has already been processed.' });
            } else if (state === 'failed') {
                res.status(StatusCodes.OK).json({ message: 'Job has failed.' });
            } else {
                res.status(StatusCodes.OK).json({ message: `Job is in state: ${state}` });
            }
        } catch (error) {

        }
    }

}

export const BonsaiControllers = new BonsaiController()