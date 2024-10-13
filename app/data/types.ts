import { Document } from 'mongoose';
import { IUser, IBonsai, IBonsaiChapter } from '../../models/types';

export type UserDocument = IUser & Document
export type BonsaiDocument = IBonsai & Document
export type BonsaiQueryType = BonsaiDocument | null
export type BonsaiChapterDocument = IBonsaiChapter & Document
export type BonsaiChapterQueryType = BonsaiChapterDocument | null
export type UserQueryType = UserDocument | null
export enum UserQueryTypes {
    getByUsername = 'getByUsername',
    getByEmail = 'getByEmail',
    getByEmailorUsername = 'getByEmailorUsername'
}