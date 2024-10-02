import { UserModel } from '../../models/user';
import { UserDocument, UserQuery } from './types';
import { MongoError } from '../errors/mongo-error';
import { v4 as uuidv4 } from 'uuid';

export class User {
  static async createUser(queryParams: { username: string, email: string, hashedPassword: string }): Promise<UserDocument> {
    try {
      let newUser = new UserModel({
        username: queryParams.username,
        password: queryParams.hashedPassword,
        email: queryParams.email,
        UUID: uuidv4(),
        refreshToken: 1
      })
      await newUser.save()
      return newUser
    } catch (error) {
      throw new MongoError({
        name: 'WRITE_FAILED',
        message: 'Write failed in User.createUser',
        stack: error
      })
    }
  }

  static async getByUsername(queryParams: { username: string }): Promise<UserQuery> {
    try {
      let user = await UserModel.findOne({ username: queryParams.username })
      return user
    } catch (error) {
      throw new MongoError({
        name: 'READ_FAILED',
        message: 'Read failed in User.getByUsername',
        stack: error
      })
    }
  }

  static async getByEmail(queryParams: { email: string }): Promise<UserQuery> {
    try {
      let user = await UserModel.findOne({ email: queryParams.email })
      return user
    } catch (error) {
      throw new MongoError({
        name: 'READ_FAILED',
        message: 'Read failed in User.getByEmail',
        stack: error
      })
    }
  }

  static async getByEmailorUsername(queryParams: { email: string, username: string }): Promise<UserQuery> {
    try {
      let user = await UserModel.findOne({
        $or: [
          { username: queryParams.username },
          { email: queryParams.email }
        ]
      })
      return user
    } catch (error) {
      throw new MongoError({
        name: 'READ_FAILED',
        message: 'Read failed in User.getByEmailOrUsername',
        stack: error
      })
    }
  }
}
