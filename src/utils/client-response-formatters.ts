import Joi from "joi"
import { FormFields, JoiErrorTypes } from '../types'

type MissingFields = string[]

type InvalidFields = {
    [key in JoiErrorTypes]?: string[]
}

type ErrorMessage = {
    missingFields?: MissingFields,
    invalidFields?: InvalidFields,
}

function missingFieldsMessage(missingFields: string[]) {
    return { missingFields }
}

export function formatErrorMessage(error: Joi.ValidationError): ErrorMessage {
    let errorMessage: ErrorMessage = {}
    let missingFields: MissingFields = []
    // let invalidFields: InvalidFields = {}
    let invalidFields: InvalidFields = {}, invalid = false
    let details = error.details
    for (let error of details) {
        if (error.type === JoiErrorTypes.AnyRequired) {
            missingFields.push(error.message)
        }
        else if (
            error.type === JoiErrorTypes.StringMin ||
            error.type === JoiErrorTypes.StringMax ||
            error.type === JoiErrorTypes.StringAlphanum ||
            error.type === JoiErrorTypes.StringEmail
        ) {
            if (!Array.isArray(invalidFields)) {
                invalidFields[error.type] = [error.message]
                invalid = true
            }
            else { invalidFields[error.type]?.push(error.message) }
        }
    }
    if (missingFields.length > 0) { errorMessage.missingFields = missingFields }
    if (invalid) { errorMessage.invalidFields = invalidFields }
    return errorMessage
}

// export function formatErrorResponse(errorDetails: Joi.ValidationErrorItem[]) {
//     let obj: validationErrorResponse = {};
//     errorDetails.forEach((error) => {
//         let key = error.path.join('.');
//         obj[key] = error.message;
//     });
//     return obj;
// }
