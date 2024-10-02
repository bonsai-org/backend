import * as express from 'express';
import { SignUpRequest, LoginRequest } from './index';
import { UserDocument } from '../data/types'

declare global {
  namespace Express {
    interface Request {
      signupRequest: SignUpRequest;
      loginRequest: LoginRequest;
      user: UserDocument;
      loggedIn: boolean;
      username: string;
    }
  }
}
