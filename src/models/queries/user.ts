import { MDBDocument } from '../../types/schemas';
import { UserModel } from '../../../models/user';
import { User } from '../User';

export class UserQueries extends UserModel {
  static async queryByEmailOrUsername(
    username: string,
    email: string,
  ): Promise<MDBDocument<User> | null> {
    return UserModel.findOne({
      $or: [{ username }, { email }],
    });
  }

  static async queryByEmail(email: string): Promise<MDBDocument<User> | null> {
    return UserModel.findOne({
      email,
    });
  }

  static async queryByUsername(username: string): Promise<MDBDocument<User> | null> {
    return UserModel.findOne({
      username: username,
    });
  }
}
