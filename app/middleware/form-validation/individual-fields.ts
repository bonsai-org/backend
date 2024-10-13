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

export const hardinessZone = Joi.string()
  .valid(
    '0a',
    '0b',
    '1a',
    '1b',
    '2a',
    '2b',
    '3a',
    '3b',
    '4a',
    '4b',
    '5a',
    '5b',
    '6a',
    '6b',
    '7a',
    '7b',
    '8a',
    '8b',
    '9a',
    '9b',
    '10a',
    '10b',
    '11a',
    '11b',
    '12a',
    '12b',
    '13a',
    '13b'
  )
  .required()

export const height = Joi.number()
  .optional()

export const width = Joi.number()
  .optional()

export const nebari = Joi.number()
  .optional()

export const style = Joi.string()
  .valid(
    'Broom style (Hokidachi)',
    'Cascade (Kengai)',
    'Double trunk (Sokan)',
    'Formal upright (Chokkan)',
    'Forest (Yose-ue)',
    'Growing in a rock (Ishisuki)',
    'Growing on a rock (Seki-Joju)',
    'Informal upright (Moyogi)',
    'Literati (Bunjin-gi)',
    'Multi-trunk (Ikadabuki)',
    'Raft (Ikadabuki)',
    'Semi-cascade (Han-kengai)',
    'Shari (Sharimiki)',
    'Slanting (Shakan)',
    'Windswept (Fukinagashi)',
    'Other'
  )
  .optional()

export const species = Joi.string()
  .required()

export const geoLocation = Joi.string()
  .required()

export const fileSize = Joi.number()
  .required()

export const sequencePosition = Joi.number()
  .required()

export const date = Joi.date()
  .required()

export const caption = Joi.string()
  .required()

export const fileType = Joi.string()
  .valid('image/jpeg')
  .required()

export const environmentVariables = Joi.object<EnvironmentVariables>({
  MONGO_DB_STRING: Joi.string().uri().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'prod',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  S3_BUCKET: Joi.string().required(),
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('prod', 'dev', 'stage', 'local').required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  FRONTEND_DEV_SEVER: Joi.string().when('NODE_ENV', {
    is: 'dev',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  ACCESS_KEY_ID: Joi.string().required(),
  SECRET_ACCESS_KEY: Joi.string().required()
}).unknown()


export const JoiValidators = {
  username,
  password,
  confirmPassword,
  email,
  environmentVariables,
  hardinessZone,
  height,
  width,
  nebari,
  style,
  species,
  geoLocation,
}