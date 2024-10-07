import Joi from 'joi';
import { EnvironmentVariables } from '../../types'

export const username = Joi.string()
  .min(8)
  .max(20)
  .alphanum()
  .required();

export const password = Joi.string()
  .min(8)
  .max(20)
  .required();

export const confirmPassword = Joi.string()
  .valid(Joi.ref('password'))
  .required();

export const email = Joi.string()
  .email()
  .required();

export const environmentVariables = Joi.object<EnvironmentVariables>({
  MONGO_DB_STRING: Joi.string().uri().required(),
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('prod', 'dev', 'stage', 'local').required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  FRONTEND_DEV_SEVER: Joi.string().when('NODE_ENV', {
    is: 'dev',
    then: Joi.required(),
    otherwise: Joi.optional(),
  })
}).unknown()


export const JoiValidators = {
  username,
  password,
  confirmPassword,
  email,
  environmentVariables,
}