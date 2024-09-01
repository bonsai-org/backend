import Joi from 'joi';
import { JoiErrorTypes } from '../../types';

export const username = Joi.string()
    .min(8)
    .max(20)
    .alphanum()
    .required()
    .messages({
        [JoiErrorTypes.StringMin]: 'Username must be at least 8 characters',
        [JoiErrorTypes.StringMax]: 'Username cannot exceed 20 characters',
        [JoiErrorTypes.StringAlphanum]: 'Username can only contain a-z, A-Z, 0-9',
        [JoiErrorTypes.AnyRequired]: 'You must supply a Username',
    })

export const password = Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
        [JoiErrorTypes.StringMin]: 'Password must be at least 8 characters',
        [JoiErrorTypes.StringMax]: 'Password cannot exceed 20 characters',
        [JoiErrorTypes.AnyRequired]: 'You must supply a Password',
    })

export const confirmPassword = Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'any.only': 'Passwords must match',
        'any.required': 'You must confirm your password',
    });

export const email = Joi.string()
    .email()
    .required()
    .messages({
        [JoiErrorTypes.StringEmail]: 'You must supply a valid email',
        [JoiErrorTypes.AnyRequired]: 'You must supply a valid email to sign up',
    })


