import { IUser } from '../types/schemas';
import { UserModel } from './schemas/user';
import { UserQuery } from '../types';
import { UserQueries } from './queries/user';

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

  static async findByUsername(username: string): Promise<UserQuery> {
    try {
      let user = await UserQueries.queryByUsername(username);
      if (user !== null) {
        return { user, error: null };
      }
      return { user: null, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }

  static async findByEmailOrUsername(
    username: string,
    email: string,
  ): Promise<UserQuery> {
    try {
      let user = await UserQueries.queryByEmailOrUsername(username, email);
      if (user !== null) {
        return { user, error: null };
      }
      return { user: null, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }
}
