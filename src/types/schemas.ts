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
  user: Types.ObjectId;
  bonsaiChapters: Types.ObjectId[];
  hardiness_zone: string;
  height: number;
  width: number;
  nebari: number;
  style: string;
  species: string;
}

export interface IBonsaiChapter {
  photoUrls: string[];
  bonsai: Types.ObjectId;
  date: Date;
  caption: string;
}
