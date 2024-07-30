import * as express from "express"
import { SignUpRequest } from './index'

declare global {
    namespace Express {
        interface Request {
            signupRequest?: SignUpRequest
        }
    }
}