import { IUser } from '../types/schemas'
import { UserModel } from './schemas/user'
import { UserQuery } from '../types'
import { UserQueries } from './queries/user'

export class User extends UserModel {
    constructor({
        username,
        password,
        email,
        salt,
        UUID,
    }: IUser) {
        super({
            username,
            password,
            email,
            salt,
            UUID
        })
    }

    static async findByEmailOrUsername(
        username: string,
        email: string,
    ): Promise<UserQuery> {
        try {
            debugger
            let user = await UserQueries.queryByEmailOrUsername(username, email)
            if (user !== null) {
                return { user, error: null }
            }
            return { user: null, error: null }
        } catch (error) {
            return { user: null, error }
        }
    }
}