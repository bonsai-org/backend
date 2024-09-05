/*
 * This file will wrap createUser from ./signup so that it can be easily used
 * with Data libraries used to test the bonsai backend
 */

import { IUser } from '../src/types/schemas';
import { User } from '../src/models/User';
import UserRequests from './data';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { MongoError } from '../src/errors/mongo-error';
import { TestUser } from './data';

async function saveUser(
  username: string,
  hashedPassword: string,
  email: string,
): Promise<User> {
  try {
    let user = new User({
      username,
      password: hashedPassword,
      email,
      UUID: uuidv4(),
      refreshToken: 1,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new MongoError({
      name: 'FAILED_TO_SAVE_NEW_USER',
      message: 'Failed to create new user document during signup',
      stack: error,
    });
  }
}

export async function TEST_createUser(testUserData: TestUser): Promise<User> {
  if (
    typeof testUserData.username !== 'string' ||
    typeof testUserData.password !== 'string' ||
    typeof testUserData.email !== 'string'
  ) {
    throw new Error('No test variables passed');
  }
  let { user, error } = await User.findByEmailOrUsername(
    testUserData.username as string,
    testUserData.email as string,
  );
  if (user) {
    throw new Error('User already exists in database');
  }
  let hashedPassword = await hash(testUserData.password, 12);
  let newUser = await saveUser(
    testUserData.username,
    hashedPassword,
    testUserData.email,
  );
  return newUser;
}
