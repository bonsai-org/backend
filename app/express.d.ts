import { UserDocument } from "./types";
import { SignUpRequest, LoginRequest } from "./types";


declare global {
    namespace Express {
        interface Request {
            signupRequest: SignUpRequest;
            loginRequest: LoginRequest;
            user: UserDocument;
            username: string
        }
    }
}