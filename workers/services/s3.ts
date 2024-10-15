import { S3Client as s3Client } from '@aws-sdk/client-s3'

export const S3Client = new s3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: 'us-west-1'
})