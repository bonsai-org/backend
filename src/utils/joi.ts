import Joi from "joi";
import { validationErrorResponse } from '../types'

export function formatMissingEnvVariables(errorDetails: Joi.ValidationErrorItem[]) {
    return errorDetails.map((errorEntry) => errorEntry.path.join(',')).join(', ');
}

export function formatErrorResponse(errorDetails: Joi.ValidationErrorItem[]) {
    let obj: validationErrorResponse = {}
    errorDetails.forEach((error) => {
        let key = error.path.join('.')
        obj[key] = error.message
    })
    return obj
}