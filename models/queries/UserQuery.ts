import { QueryErrors } from './errors'
import { UserModel } from '../user';
import { UserDocument } from '../types';
import { FilterQuery } from 'mongoose';

class UserQueries {

    private async getQuery(
        query: FilterQuery<UserDocument>,
        methodName: any,
    ): Promise<UserDocument> {
        try {
            let user = await UserModel.findOne(query)
            if (!user) {
                throw new QueryErrors.UserQuery({
                    name: 'USER_NOT_FOUND',
                    message: `User does not exist when executing ${methodName}`,
                })
            }
            return user
        } catch (error) {
            if (error instanceof QueryErrors.UserQuery) { throw error }
            throw new QueryErrors.UncaughtError({
                name: 'UNCAUGHT_ERROR',
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
            throw new QueryErrors.UserQuery({
                name: 'USER_NOT_FOUND',
                message: `Failed to find user with given username ${username}`
            })
        }
        return user
    }

    async incRefreshToken(
        queryParams: { username: string }
    ): Promise<boolean> {
        let { username } = queryParams
        let writeResult = await UserModel.updateOne(
            { username },
            { $inc: { refreshToken: 1 } }
        )
        return writeResult.acknowledged
    }
}

export const UserQuery = new UserQueries()