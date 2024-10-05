import Joi from 'joi';
import { SignUpRequest, LoginRequest } from '../../types';
import {
  username,
  password,
  confirmPassword,
  email,
} from './individual-fields';

export const signupValidation = Joi.object<SignUpRequest>({
  username,
  password,
  confirmPassword,
  email,
}).unknown();

export const loginValidation = Joi.object<LoginRequest>({
  username,
  password,
}).unknown();
