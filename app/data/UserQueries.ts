import { Errors } from '../errors'
import { UserModel } from '../../models/user';
import { UserDocument, UserQueryTypes } from './types';
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

    private async queryByUsername(queryParams: {
        username: string;
    }): Promise<UserDocument> {
        let { username } = queryParams
        return this.getQuery(
            { username },
            this.getByUsername.name
        )
    }

    private async getByEmail(queryParams: { email: string }): Promise<UserDocument> {
        let { email } = queryParams
        return this.getQuery(
            { email },
            this.getByEmail,
        )
    }

    private async getByEmailorUsername(queryParams: { email: string, username: string }): Promise<UserDocument> {
        let { email, username } = queryParams
        return this.getQuery(
            {
                $or: [
                    { email },
                    { username }
                ]
            },
            this.getByEmailorUsername
        )
    }

    async getByUsername(
        queryParams: { username: string }
    ): Promise<UserDocument> {
        let { username } = queryParams
        let user = await this.queryByUsername({ username })
        if (!user) {
            throw new Errors.DataError.UserError({
                name: 'USER_DOES_NOT_EXIST',
                message: `Failed to find user with given username ${username}`
            })
        }
        return user
    }
}

export const UserQuery = new UserQueries()