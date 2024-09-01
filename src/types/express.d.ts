import * as express from 'express';
import { SignUpRequest, LoginRequest } from './index';

declare global {
  namespace Express {
    interface Request {
      signupRequest?: SignUpRequest;
      loginRequest?: LoginRequest;
    }
  }
}
