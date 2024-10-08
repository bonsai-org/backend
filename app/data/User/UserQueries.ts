import { Errors } from '../../errors'
import { UserModel } from '../../../models/user';
import { UserDocument, UserQueryTypes } from '../types';
import { FilterQuery } from 'mongoose';

class UserQueries {

    private async getQuery(
        query: FilterQuery<UserDocument>,
        methodName: any,
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

    private async username(queryParams: {
        username: string;
    }): Promise<UserDocument> {
        let { username } = queryParams
        return this.getQuery(
            { username },
            this.username.name
        )
    }

    private async email(queryParams: { email: string }): Promise<UserDocument> {
        let { email } = queryParams
        return this.getQuery(
            { email },
            this.email,
        )
    }

    private async emailOrUsername(queryParams: { email: string, username: string }): Promise<UserDocument> {
        let { email, username } = queryParams
        return this.getQuery(
            {
                $or: [
                    { email },
                    { username }
                ]
            },
            this.emailOrUsername
        )
    }

    async getByUsername(
        queryParams: { username: string }
    ): Promise<UserDocument> {
        let { username } = queryParams
        let user = await this.username({ username })
        if (!user) {
            throw new Errors.DataError.UserError({
                name: 'USER_DOES_NOT_EXIST',
                message: `Failed to find user with given username ${username}`
            })
        }
        return user
    }

    async incRefreshToken(
        queryParams: { username: string }
    ): Promise<boolean> {
        let { username } = queryParams
        let model = await UserModel.updateOne(
            { username },
            { $inc: { refreshToken: 1 } }
        )
        return model.acknowledged
    }
}

export const UserQuery = new UserQueries()