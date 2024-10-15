/*
 * This file will wrap createUser from ./signup so that it can be easily used
 * with Data libraries used to test the bonsai backend
 */

import { IUser } from '../models/types';
import { User } from '../src/data/User';
import UserRequests from './data';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { MongoError } from '../src/errors/mongo-error';
import { TestUser } from './data';


export async function TEST_createUser(testUserData: TestUser): Promise<User> {
  if (
    typeof testUserData.username !== 'string' ||
    typeof testUserData.password !== 'string' ||
    typeof testUserData.email !== 'string'
  ) {
    throw new Error('No test variables passed');
  }
  let user = await User.getByEmailorUsername({
    username: testUserData.username as string,
    email: testUserData.email as string
  })
  if (user) {
    throw new Error('User already exists in database');
  }
  let hashedPassword = await hash(testUserData.password, 12);
  let newUser = await User.createUser({
    username: testUserData.username,
    hashedPassword: testUserData.password,
    email: testUserData.email
  })
  return newUser;
}
