import { MongoDocumentQuery } from '../types/schemas';
import { IUser } from '../types/schemas';
import { UserModel } from './schemas/user';
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

  static async findByUsername(username: string): Promise<MongoDocumentQuery<IUser>> {
    try {
      let user = await UserQueries.queryByUsername(username);
      if (user !== null) {
        return { data: user, error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async findByEmailOrUsername(
    username: string,
    email: string,
  ): Promise<MongoDocumentQuery<IUser>> {
    try {
      let user = await UserQueries.queryByEmailOrUsername(username, email);
      if (user !== null) {
        return { data: user, error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}
