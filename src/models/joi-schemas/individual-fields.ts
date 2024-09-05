import Joi from 'joi';
import { JoiErrorTypes, FormFields } from '../../types';

export const username = Joi.string()
    .min(8)
    .max(20)
    .alphanum()
    .required()
    .messages({
        [JoiErrorTypes.StringMin]: FormFields.USERNAME,
        [JoiErrorTypes.StringMax]: FormFields.USERNAME,
        [JoiErrorTypes.StringAlphanum]: FormFields.USERNAME,
        [JoiErrorTypes.AnyRequired]: FormFields.USERNAME,
    })

export const password = Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
        [JoiErrorTypes.StringMin]: FormFields.PASSWORD,
        [JoiErrorTypes.StringMax]: FormFields.PASSWORD,
        [JoiErrorTypes.AnyRequired]: FormFields.PASSWORD,
    })

export const confirmPassword = Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        [JoiErrorTypes.AnyOnly]: FormFields.CONFIRM_PASSWORD,
        [JoiErrorTypes.AnyRequired]: FormFields.CONFIRM_PASSWORD,
    });

export const email = Joi.string()
    .email()
    .required()
    .messages({
        [JoiErrorTypes.StringEmail]: FormFields.EMAIL,
        [JoiErrorTypes.AnyRequired]: FormFields.EMAIL,
    })


