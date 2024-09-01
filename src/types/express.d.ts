import * as express from 'express';
import { SignUpRequest, LoginRequest } from './index';
import { IUser } from './schemas';

declare global {
  namespace Express {
    interface Request {
      signupRequest?: SignUpRequest;
      loginRequest?: LoginRequest;
      user?: IUser
    }
  }
}
