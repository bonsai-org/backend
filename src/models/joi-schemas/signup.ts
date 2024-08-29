import Joi from "joi";
import { JoiErrorTypes, SignUpRequest } from '../../types'

export const signupValidation = Joi.object<SignUpRequest>({
    username: Joi.string()
        .min(8)
        .max(20)
        .alphanum()
        .required()
        .messages({
            [JoiErrorTypes.StringMin]: 'Username must be at least 8 characters',
            [JoiErrorTypes.StringMax]: 'Username cannot exceed 20 characters',
            [JoiErrorTypes.StringAlphanum]: 'Username can only contain a-z, A-Z, 0-9',
            [JoiErrorTypes.AnyRequired]: 'You must supply a Username'
        }),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
            [JoiErrorTypes.StringMin]: 'Password must be at least 8 characters',
            [JoiErrorTypes.StringMax]: 'Password cannot exceed 20 characters',
            [JoiErrorTypes.AnyRequired]: 'You must supply a Password'
        }),
    confirmPassword: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.string().valid(Joi.ref('password')).required(),
        otherwise: Joi.string().optional()
    }).messages({
        [JoiErrorTypes.AnyOnly]: 'Password and Confirm Password must match',
        [JoiErrorTypes.AnyRequired]: 'You must supply a \'confirm password\' to finish signing up',
    }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            [JoiErrorTypes.StringEmail]: 'You must supply a valid email',
            [JoiErrorTypes.AnyRequired]: 'You must supply a valid email to sign up',
        })
}).unknown()
