import { Types } from "mongoose"

export interface IUser {
    username: string;
    password: string;
    email: string;
    salt: string;
    profilePhoto?: string;
    bio?: string;
    bonsai: Types.ObjectId[];
    UUID: Types.UUID;
}