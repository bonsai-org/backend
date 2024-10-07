import { Document } from 'mongoose';
import { IUser } from '../../models/types';

export type UserDocument = IUser & Document
export type UserQueryType = UserDocument | null
export enum UserQueryTypes {
    getByUsername = 'getByUsername',
    getByEmail = 'getByEmail',
    getByEmailorUsername = 'getByEmailorUsername'
}