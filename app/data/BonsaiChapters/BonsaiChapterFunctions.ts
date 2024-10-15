import { BonsaiChapterDocument } from '../types'
import { BonsaiChapterMetadata } from '../../types'
import { BonsaiChapterModel } from '../../../models/bonsaiChapter'
import { Errors } from '../../errors'
import { S3Client } from '../../bin/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

class BonsaiChapterService {
    // constructChapter(params: {
    //     chapterMetadata: BonsaiChapterMetadata,
    //     bonsaiID: mongoose.Schema.Types.ObjectId,
    //     bonsaiPrivateHash: string,
    //     bonsaiPublicHash: string
    // }): BonsaiChapterDocument {
    //     return new BonsaiChapterModel({
    //         bonsai: params.bonsaiID,
    //         date: params.chapterMetadata.date,
    //         caption: params.chapterMetadata.caption,
    //         sequencePosition: params.chapterMetadata.sequencePosition,
    //         bonsaiPrivateHash: params.bonsaiPrivateHash,
    //         bonsaiPublicHash: params.bonsaiPublicHash,
    //         photoName: params.bonsaiPrivateHash + '/' + params.chapterMetadata.sequencePosition
    //     })
    // }

    constructChapter(params: {
        chapterMetadata: BonsaiChapterMetadata,
        bonsaiID: mongoose.Schema.Types.ObjectId,
        bonsaiPrivateHash: string,
        bonsaiPublicHash: string
    }): BonsaiChapterDocument {
        let chapterPrivateHash = uuidv4()
        let chapterPublicHash = uuidv4()
        let photoNames = params.chapterMetadata.photos.map((photo) => {
            return (
                `${params.bonsaiPrivateHash}/${chapterPrivateHash}/${photo.photoOrder}`
            )
        })
        return new BonsaiChapterModel({
            bonsai: params.bonsaiID,
            date: params.chapterMetadata.date,
            caption: params.chapterMetadata.caption,
            bonsaiPrivateHash: params.bonsaiPrivateHash,
            bonsaiPublicHash: params.bonsaiPublicHash,
            bonsaiChapterPrivateHash: chapterPrivateHash,
            bonsaiChapterPublicHash: chapterPublicHash,
            photoNames,
        })
    }

    constructChapters(params: {
        chapterMetadata: BonsaiChapterMetadata[],
        bonsaiID: mongoose.Schema.Types.ObjectId,
        bonsaiPrivateHash: string,
        bonsaiPublicHash: string
    }): BonsaiChapterDocument[] {
        let bonsaiChapters: BonsaiChapterDocument[] = params.chapterMetadata.map((chapter) => {
            return this.constructChapter({
                chapterMetadata: chapter,
                bonsaiID: params.bonsaiID,
                bonsaiPrivateHash: params.bonsaiPrivateHash,
                bonsaiPublicHash: params.bonsaiPublicHash
            })
        })
        return bonsaiChapters
    }

    async saveChapters(
        chapters: BonsaiChapterDocument[],
    ): Promise<void> {
        try {
            await Promise.all(chapters.map((chapter) => {
                return chapter.save()
            }))
        } catch (error) {
            throw new Errors.SystemError.DatabaseError({
                name: 'WRITE_FAILED',
                message: `Failed to save new chapters to MongoDB`,
                stack: error,
            })
        }
    }

    async generateLinks(queryParams: {
        chapters: BonsaiChapterDocument[]
    }) {
        try {
            let signedURLs = await Promise.all(
                queryParams.chapters.map(async (chapter) => {
                    let links = await Promise.all(
                        chapter.photoNames.map((photoName) => {
                            return getSignedUrl(
                                S3Client,
                                new PutObjectCommand({
                                    Bucket: process.env.S3_BUCKET,
                                    Key: photoName,
                                    ContentType: 'image/jpeg',
                                }),
                                { expiresIn: 30 }
                            )
                        })
                    )
                    return links
                })
            )
            return signedURLs.flat()
        } catch (error) {
            throw new Errors.DataError.BonsaiChapterServicesError({
                name: 'FAILED_TO_GENERATE_LINKS',
                message: `Failed to generate uploadable S3 links for client`,
                stack: error,
            })
        }
    }
}

export const BonsaiChapterFunctions = new BonsaiChapterService()