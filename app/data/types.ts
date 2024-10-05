import { Document } from 'mongoose';
import { IUser } from '../../models/types';

export type UserDocument = IUser & Document
export type UserQuery = UserDocument | null
export enum UserQueries {
    getByUsername = 'getByUsername',
    getByEmail = 'getByEmail',
    getByEmailorUsername = 'getByEmailorUsername'
}