import { EnvironmentVariables } from '../types';
import { CriticalError } from './error';
import { join } from 'path';
import { config } from 'dotenv';
import Joi from 'joi';

const envVarsSchema = Joi.object<EnvironmentVariables>({
  MONGO_DB_STRING: Joi.string().uri().required(),
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().required()
}).unknown();

function loadDotenv() {
  config({ path: join(__dirname, '../../.env') });
}

function formatMissingVariables(errorDetails: Joi.ValidationErrorItem[]) {
  return errorDetails.map((errorEntry) => errorEntry.path.join(',')).join(', ');
}

function loadEnvironment(): EnvironmentVariables {
  if (process.env.NODE_ENV === undefined) {
    loadDotenv();
  }
  const { error, value } = envVarsSchema.validate(process.env, {
    abortEarly: false,
  });
  if (error instanceof Joi.ValidationError) {
    throw new CriticalError({
      name: 'MISSING_ENVIRONMENT_VARIABLES',
      message: `Missing the following environment variables: ${formatMissingVariables(error.details)}`,
    });
  }
  return value;
}

const envVariables = loadEnvironment();

export default envVariables;
