import { Types } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
    email: string;
    profilePhoto?: string;
    bio?: string;
    bonsai?: Types.ObjectId[];
    UUID: string;
    refreshToken: number;
}

export interface IBonsai {
    user: string;
    bonsaiChapters: Types.ObjectId[];
    hardiness_zone: string;
    height?: number;
    width?: number;
    nebari?: number;
    style?: string;
    species: string;
    geoLocation: string
    privateHash: string,
    publicHash: string,
    uploaded: boolean,
    photoNames: string[]
}

export interface IBonsaiChapter {
    bonsai: Types.ObjectId;
    date: Date;
    caption: string;
    sequencePosition: number
    photoName: string,
    bonsaiPrivateHash: string,
    bonsaiPublicHash: string
}