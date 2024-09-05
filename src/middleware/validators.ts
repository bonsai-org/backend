import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../types';
import { __dev__ } from '../utils/constants';
import { loginValidation, signupValidation } from '../models/joi-schemas/controllers';
import { formatErrorMessage } from '../utils/client-response-formatters'

export function validateSignup(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const { error, value } = signupValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    if (__dev__) { console.log(formatErrorMessage(error)) }
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: formatErrorMessage(error) });
  }
  req.signupRequest = {
    username: value.username,
    password: value.password,
    email: value.email,
  };
  return next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
  const { error, value } = loginValidation.validate(req.body, {
    abortEarly: false
  })
  if (error) {
    return res
      .sendStatus(HttpStatusCode.Unauthorized)
  }
  req.loginRequest = {
    username: value.username,
    password: value.password
  }
  return next()
}