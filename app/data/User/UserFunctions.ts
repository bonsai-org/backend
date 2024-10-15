import { Errors } from '../../errors'
import { UserModel } from '../../../models/user';
import { UserQuery } from '../../../models/queries/UserQuery';
import { UserDocument } from '../types';
import { MongoServerErrorCodes } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { genSalt, hash } from 'bcrypt'

class UserService {

  private extractDuplicateKey(mongoError: any) {
    return Object.keys(mongoError.errorResponse.keyValue)[0]
  }

  private async hashPassword(plainTextPassword: string) {
    try {
      let salt = await genSalt(12)
      let hashedPassword = await hash(plainTextPassword, salt)
      return hashedPassword
    } catch (error) {
      throw new Errors.ThirdPartyError.BcryptError({
        name: 'HASHING_ERROR',
        message: 'Bcrypt failed to hash password during signup',
        stack: error,
      })
    }
  }

  async incrementRefreshToken(
    queryParams: { username: string }
  ) {
    let { username } = queryParams
    let updated = await UserQuery.incRefreshToken({ username })
    if (!updated) {
      throw new Errors.DataError.UserServicesError({
        name: 'UNABLE_TO_UPDATE_USER_FIELD',
        message: `Unable to icnrement refreshToken field for user with given username: ${username}`
      })
    }
  }

  async createUser(queryParams: {
    username: string;
    email: string;
    plainTextPassword: string;
  }): Promise<UserDocument> {
    try {
      let hashedPassword = await this.hashPassword(queryParams.plainTextPassword)
      let newUser = new UserModel({
        username: queryParams.username,
        password: hashedPassword,
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
        throw new Errors.DataError.UserServicesError({
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