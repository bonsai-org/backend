import { UserDocument } from "../types";

export type SignUpRequest = {
    username: string;
    password: string;
    email: string;
    confirmPassword?: string;
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type Requests = {
    LoginRequest: LoginRequest,
    SignupRequest: SignUpRequest
}

export type RefreshTokenData = {
    username: string;
    refreshTokenVersion?: number;
};

export type AccessTokenData = {
    username: string;
};

export type NewlyGeneratedTokens = {
    refreshToken: string;
    accessToken: string;
};

export type AuthorizedTokenData = {
    username: string;
    user?: UserDocument;
};