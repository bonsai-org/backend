import process from 'process';
import { EnvironmentVariables, UserQuery } from '../types';
import { SystemError } from '../errors/system-errors/system-error';
import { join } from 'path';
import { formatMissingEnvVariables } from '../utils/joi';
import Joi from 'joi';

const envVarsSchema = Joi.object<EnvironmentVariables>({
  MONGO_DB_STRING: Joi.string().uri().required(),
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('prod', 'dev', 'stage', 'local').required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
}).unknown();


function validateEnvironmentVariables() {
  let { error, value } = envVarsSchema.validate(process.env, {
    abortEarly: false,
  });
  if (error) {
    throw new SystemError({
      name: 'MISSING_ENVIRONMENT_VARIABLES',
      message: `Missing the following environment variables: ${formatMissingEnvVariables(error.details)}`,
      stack: error,
    });
  }
}

function loadEnvironment() {
  validateEnvironmentVariables();
}

export default loadEnvironment;
