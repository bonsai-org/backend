import { Queue, QueueOptions } from 'bullmq';
import { RedisOptions } from 'ioredis';
import { Errors } from '../../errors';

let redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
};

class BonsaiQueue extends Queue {

    constructor(queueName: string, options: QueueOptions) {
        super(queueName, options)
    }

    async newBonsai(
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
                    delay: process.env.NODE_ENV === 'prod' ? 120000 : 2000,
                },
            )
        } catch (error) {
            throw new Errors.SystemError.BullMQError({
                name: 'FAILED_TO_CREATE_JOB',
                message: `Failed to create new upload job for bonsai with given public hash ${params.bonsaiPublicHash}`,
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

export const BonsaiJobs = new BonsaiQueue('BonsaiQueue', {
    connection: redisOptions,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: {
            age: 24 * 3600,
        },
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
    },
});