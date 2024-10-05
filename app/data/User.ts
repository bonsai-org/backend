import { Errors } from '../errors'
import { UserModel } from '../../models/user';
import { UserDocument, UserQueries } from './types';
import { MongoServerErrorCodes } from '../errors/types';
import { v4 as uuidv4 } from 'uuid';
import { FilterQuery } from 'mongoose';

export class MongooseUtils {
  static extractDuplicateKey(mongoError: any) {
    return Object.keys(mongoError.errorResponse.keyValue)[0]
  }
}

export class User {
  static async createUser(queryParams: {
    username: string;
    email: string;
    hashedPassword: string;
  }): Promise<UserDocument> {
    try {
      let newUser = new UserModel({
        username: queryParams.username,
        password: queryParams.hashedPassword,
        email: queryParams.email,
        UUID: uuidv4(),
        refreshToken: 1,
      });
      await newUser.save();
      return newUser;
    } catch (error: any) {
      if (
        error.code === MongoServerErrorCodes.DuplicateKey
      ) {
        throw new Errors.DataError.UserError({
          name: 'DUPLICATE_KEY',
          message: `Attempted to create user with duplicate field: ${MongooseUtils.extractDuplicateKey(error)}`,
          duplicateKey: MongooseUtils.extractDuplicateKey(error)
        })
      }
      throw new Errors.SystemError.DatabaseError({
        name: 'WRITE_FAILED',
        message: 'Write failed in User.createUser',
        stack: error,
      });
    }
  }

  private static async getQuery(
    query: FilterQuery<UserDocument>,
    methodName: UserQueries,
  ): Promise<UserDocument> {
    try {
      let user = await UserModel.findOne(query)
      if (!user) {
        throw new Errors.DataError.UserError({
          name: 'USER_DOES_NOT_EXIST',
          message: `User does not exist when executing ${methodName}`,
        })
      }
      return user
    } catch (error) {
      if (error instanceof Errors.DataError.UserError) { throw error }
      throw new Errors.SystemError.DatabaseError({
        name: 'READ_FAILED',
        message: `Read failed in User.${methodName}`,
        stack: error,
      });
    }
  }

  public static async getByUsername(queryParams: {
    username: string;
  }): Promise<UserDocument> {
    let { username } = queryParams
    return this.getQuery(
      { username },
      UserQueries.getByUsername,
    )
  }

  public static async getByEmail(queryParams: { email: string }): Promise<UserDocument> {
    let { email } = queryParams
    return this.getQuery(
      { email },
      UserQueries.getByEmail,
    )
  }

  public static async getByEmailorUsername(queryParams: { email: string, username: string }): Promise<UserDocument> {
    let { email, username } = queryParams
    return this.getQuery(
      {
        $or: [
          { email },
          { username }
        ]
      },
      UserQueries.getByEmailorUsername
    )
  }
}
