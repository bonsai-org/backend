import Joi from 'joi'
import { Errors } from '../errors'
import { JoiValidators } from '../joi'

export default function validateEnvironment(): void {
    let { error, value } = JoiValidators.environmentVariables.validate(process.env, { abortEarly: false })
    if (error instanceof Joi.ValidationError) {
        throw new Errors.SystemError.EnvironmentError({
            name: 'ENVIRONMENT_VARIABLE_VALIDATION_ERROR',
            message: error.message,
            stack: error
        })
    }
    else if (error) {
        throw new Errors.SystemError.UnknownException({
            name: 'UNCAUGHT_EXCEPTION',
            message: 'Unknown exception occured while validating environment variables at startup',
            stack: error
        })
    }
}