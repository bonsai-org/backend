import { ValidateEnvironment } from './environment'
import { ConnectMongo } from './mongo'
import { redisOptions } from './redis'
import { S3Client } from './s3'

export const Services = {
    ValidateEnvironment,
    ConnectMongo,
    redisOptions,
    S3Client,
}
