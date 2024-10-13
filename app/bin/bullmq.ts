import { Queue, QueueOptions } from 'bullmq';
import { RedisOptions } from 'ioredis';
import { Errors } from '../errors';

let redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

class BonsaiQueueHelpers extends Queue {

    constructor(queueName: string, options: QueueOptions) {
        super(queueName, options)
    }

    async dispatchUploadJob(
        params: {
            bonsaiPublicHash: string,
            numPhotos: number,
        }
    ): Promise<void> {
        try {
            await this.add(
                'newBonsaiUpload',
                { expectedPhotos: params.numPhotos },
                {
                    jobId: params.bonsaiPublicHash,
                    delay: 120000 // 2 minutes
                }
            )
        } catch (error) {
            throw new Errors.SystemError.BullMQError({
                name: 'FAILED_TO_CREATE_JOB',
                message: 'Failed to create a job after user attempted to upload new Bonsai',
                stack: error,
            })
        }
    }

    async promoteUploadJob(
        params: { bonsaiPublicHash: string }
    ): Promise<void> {
        try {
            let job = await this.getJob(params.bonsaiPublicHash)
            let jobState = await job?.getState()
            if (jobState === 'delayed') {
                await job?.promote()
            }
        } catch (error) {
            throw new Errors.SystemError.BullMQError({
                name: 'FAILED_TO_PROMOTE_JOB',
                message: `Failed to promote job for bonsai ${params.bonsaiPublicHash}`,
                stack: error,
            })
        }
    }
}

export const BonsaiQueue = new BonsaiQueueHelpers('BonsaiImageQueue', {
    connection: redisOptions,
});