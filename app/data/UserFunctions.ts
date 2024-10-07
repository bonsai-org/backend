import { Errors } from '../errors'
import { UserModel } from '../../models/user';
import { UserDocument, UserQueryTypes } from './types';
import { MongoServerErrorCodes } from '../types';
import { v4 as uuidv4 } from 'uuid';

class UserService {

  private extractDuplicateKey(mongoError: any) {
    return Object.keys(mongoError.errorResponse.keyValue)[0]
  }

  async createUser(queryParams: {
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
          message: `Attempted to create user with duplicate field: ${this.extractDuplicateKey(error)}`,
          duplicateKey: this.extractDuplicateKey(error)
        })
      }
      throw new Errors.SystemError.DatabaseError({
        name: 'WRITE_FAILED',
        message: 'Write failed in User.createUser',
        stack: error,
      });
    }
  }
}

export const UserFunctions = new UserService()