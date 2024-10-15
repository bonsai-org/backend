import Joi from 'joi'
import { Errors } from '../errors'
import { Types } from '../types'

let environmentSchema = Joi.object<Types.EnvironmentVariables>({
    NODE_ENV: Joi.string().valid('prod', 'dev', 'stage', 'local').required(),
    MONGO_DB_STRING: Joi.string().uri().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().when('NODE_ENV', {
        is: 'prod',
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    S3_BUCKET: Joi.string().required(),
    ACCESS_KEY_ID: Joi.string().required(),
    SECRET_ACCESS_KEY: Joi.string().required()
}).unknown()

export function ValidateEnvironment() {
    const { error, value } = environmentSchema.validate(process.env)
    if (error) {
        if (error instanceof Joi.ValidationError) {
            throw new Errors.EnvironmentError({
                name: 'FAILED_TO_VALIDATE_AT_STARTUP',
                message: error.message,
                stack: error
            })
        }
        throw new Errors.UncaughtExeception({
            name: 'IDK!',
            message: 'Joi failed for some other reason than a ValidationError',
            stack: error
        })
    }
}
