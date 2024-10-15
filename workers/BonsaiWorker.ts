/// <reference types="./types/environment.d.ts" />
import { Worker, Job } from 'bullmq'
import { BonsaiModel } from './models/bonsai';
import { Errors } from './errors';
import { Services } from './services';

class BonsaiWorkerFunctions {
    private async setUploadtoTrue(job: Job) {
        try {
            let bonsaiHash = job.id as string
            let status = await BonsaiModel.updateOne(
                { publicHash: bonsaiHash },
                { $set: { uploaded: true } }
            )
            if (!status.acknowledged) {
                throw new Errors.JobError({
                    name: 'JOB_FAILED',
                    message: `Failed to update Bonsai upload paramter with value ${bonsaiHash}`,
                    level: 'INFO'
                })
            }
        } catch (error) {
            console.error(error)
            if (error instanceof Errors.JobError) { throw error }
            throw new Errors.UncaughtExeception({
                name: 'IDK!',
                message: `An uncaught exception exception occured in ${this.newBonsaiUpload}`,
                stack: error,
            })
        }
    }

    async newBonsaiUpload(job: Job) {
        await this.setUploadtoTrue(job)
    }
}


(async () => {
    Services.ValidateEnvironment()
    await Services.ConnectMongo()
    const BonsaiWorkerJobs = new BonsaiWorkerFunctions();
    const worker = new Worker('BonsaiQueue', async (job: Job) => {
        await BonsaiWorkerJobs.newBonsaiUpload(job)
        console.log('it works')
    }, { connection: { host: 'localhost', port: 6379 } });
    worker.on('completed', (job) => { console.log(`[JOB COMPLETED] ${job.name} ${job.id}`) })
})()

