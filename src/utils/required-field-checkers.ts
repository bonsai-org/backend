import { Request } from 'express';
import { SignUpError } from '../errors/application-errors/signup-error';
import { SignUpRequest } from '../types';

export function getSignupVariables(req: Request): SignUpRequest {
  let signupRequest = req.signupRequest;
  if (
    !signupRequest ||
    !signupRequest.username ||
    !signupRequest.password ||
    !signupRequest.email
  ) {
    throw new SignUpError({
      name: 'MISSING_REQUIRED_FIELDS',
      message: 'Missing something??',
      level: 'Fatal',
    });
  }
  return {
    username: signupRequest.username,
    password: signupRequest.password,
    email: signupRequest.email,
  };
}
