import { IUser } from '../../models/types';
import { UserModel } from '../../models/user';
import { MongoError } from '../errors/mongo-error';

export class User extends UserModel {
  constructor({ username, password, email, UUID, refreshToken }: IUser) {
    super({
      username,
      password,
      email,
      UUID,
      refreshToken,
    });
  }

  static async getByUsername(queryParams: { username: string }): Promise<User | null> {
    try {
      let user = await User.findOne({ username: queryParams.username })
      return user
    } catch (error) {
      throw new MongoError({
        name: 'READ_FAILED',
        message: 'Read failed in User.getByUsername',
        stack: error
      })
    }
  }

  static async getByEmail(queryParams: { email: string }): Promise<User | null> {
    try {
      let user = await User.findOne({ email: queryParams.email })
      return user
    } catch (error) {
      throw new MongoError({
        name: 'READ_FAILED',
        message: 'Read failed in User.getByEmail',
        stack: error
      })
    }
  }

  static async getByEmailorUsername(queryParams: { email: string, username: string }) {
    try {
      let user = await User.findOne({
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
