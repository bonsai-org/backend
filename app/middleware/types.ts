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

export type NewBonsaiRequest = {
    hardinessZone: string,
    height?: number,
    width?: number,
    nebari?: number,
    style?: string,
    species: string,
    geoLocation: string,
    chapters: BonsaiChapterMetadata[]
}

export type BonsaiChapterMetadata = {
    fileSize: number,
    sequencePosition: number,
    date: Date,
    caption: string,
    fileType: 'image/jpeg'
}

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