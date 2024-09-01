import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../types';
import { formatErrorResponse } from '../utils/joi';
import { signupValidation } from '../models/joi-schemas/controllers';

export function validateSignup(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const { error, value } = signupValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: formatErrorResponse(error.details) });
  }
  req.signupRequest = {
    username: value.username,
    password: value.password,
    email: value.email,
  };
  return next();
}

export function validateLogin(req: Request, res: Response, next: NextFunction): Response | void {

}