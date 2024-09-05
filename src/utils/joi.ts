import Joi from 'joi';
import { validationErrorResponse } from '../types';

export function formatMissingEnvVariables(
  errorDetails: Joi.ValidationErrorItem[],
) {
  return errorDetails.map((errorEntry) => errorEntry.path.join(',')).join(', ');
}