import Joi from 'joi';
import { SignUpRequest, LoginRequest } from './types';
import {
    username,
    password,
    confirmPassword,
    email,
} from './individual-fields';

class ValidationChain {
    signup = Joi.object<SignUpRequest>({
        username,
        password,
        confirmPassword,
        email,
    }).unknown();

    login = Joi.object<LoginRequest>({
        username,
        password,
    }).unknown();
}

export const ValidationChains = new ValidationChain()