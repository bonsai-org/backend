import { UserModel } from "../schemas/user";
import { IUser } from '../../types/schemas'

export class UserQueries extends UserModel {
    static async queryByEmailOrUsername(
        username: string,
        email: string,
    ): Promise<IUser | null> {
        return UserModel.findOne({
            $or: [{ username }, { email }],
        });
    }

    static async queryByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({
            email,
        });
    }

    static async queryByUsername(username: string): Promise<IUser | null> {
        return UserModel.findOne({
            username: username,
        });
    }
}