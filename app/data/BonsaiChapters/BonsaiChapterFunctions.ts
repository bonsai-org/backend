import { BonsaiChapterDocument } from '../types'
import { BonsaiChapterMetadata } from '../../types'
import { BonsaiChapterModel } from '../../../models/bonsaiChapter'
import { Errors } from '../../errors'
import { S3Client } from '../../bin/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import mongoose from 'mongoose'

class BonsaiChapterService {
    constructChapter(params: {
        chapterMetadata: BonsaiChapterMetadata,
        bonsaiID: mongoose.Schema.Types.ObjectId,
        bonsaiPrivateHash: string,
        bonsaiPublicHash: string
    }): BonsaiChapterDocument {
        return new BonsaiChapterModel({
            bonsai: params.bonsaiID,
            date: params.chapterMetadata.date,
            caption: params.chapterMetadata.caption,
            sequencePosition: params.chapterMetadata.sequencePosition,
            bonsaiPrivateHash: params.bonsaiPrivateHash,
            bonsaiPublicHash: params.bonsaiPublicHash,
            photoName: params.bonsaiPrivateHash + '/' + params.chapterMetadata.sequencePosition
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
        imageNames: string[],
    }) {
        try {
            let signedUrls = await Promise.all(
                queryParams.imageNames.map((imageName) => {
                    return getSignedUrl(
                        S3Client,
                        new PutObjectCommand({
                            Bucket: process.env.S3_BUCKET,
                            Key: imageName,
                            ContentType: 'image/jpeg',
                        }),
                        { expiresIn: 30 }
                    )
                })
            )
            return signedUrls
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