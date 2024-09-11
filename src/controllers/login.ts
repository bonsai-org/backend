import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { HttpStatusCode, LoginRequest } from '../types';
import { sendAuthTokens } from '../middleware/jwts';
import { LoginError } from '../errors/application-errors/login-error';
import { IUser } from '../types/schemas';
import { compare } from 'bcrypt';
import { InternalApiError } from '../errors/internalApiError';
import { MongoError } from '../errors/mongo-error';

function getLoginVariables(req: Request): LoginRequest {
  let loginRequest = req.loginRequest;
  if (!loginRequest || !loginRequest.username || !loginRequest.password) {
    throw new InternalApiError({
      name: 'REQUEST_OBJECT_MISSING_PROPERTY',
      message: 'Missing request object fields in login controller',
    });
  }
  return {
    username: loginRequest.username,
    password: loginRequest.password,
  };
}

/*
 * Queries database to see if a user with a supplied username exists and
 * returns that user if so
 */

async function checkIfUserExists(username: string): Promise<IUser> {
  let { user, error } = await User.findByUsername(username);
  if (error) {
    throw new MongoError({
      name: 'FAILED_TO_LOOK_UP_EXISTING_USER',
      message: 'An error occured while querying for a user in login',
      stack: error,
    });
  }
  if (user === null) {
    throw new LoginError({
      name: 'NON_EXISTENT_USER',
      message: `No user exists with given username ${username}`,
      level: 'Info',
    });
  }
  return user;
}

/*
 * Validates plain text password supplied by user against hashed password
 * stored in database
 */

async function validatePassword(
  plainTextPassword: string,
  hashedPassword: string,
  username: string,
): Promise<void> {
  let validPassword = await compare(plainTextPassword, hashedPassword);
  if (!validPassword) {
    throw new LoginError({
      name: 'INVALID_PASSWORD',
      message: `${username} supplied an invalid password`,
      level: 'Info',
    });
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    let { username, password } = getLoginVariables(req);
    let user = await checkIfUserExists(username);
    await validatePassword(password, user.password, user.username);
    sendAuthTokens(res, user);
    return res
      .status(HttpStatusCode.Ok)
      .json({ username: user.username, profilePhoto: user.profilePhoto || '' })
  } catch (error) {
    if (error instanceof LoginError) {
      console.log(error.message);
      if (
        error.name === 'INVALID_PASSWORD' ||
        error.name === 'NON_EXISTENT_USER'
      ) {
        return res.sendStatus(HttpStatusCode.Unauthorized);
      } else if (
        error.name === 'INTERNAL_API_ERROR' ||
        error.name === 'MISSING_REQUIRED_FIELDS'
      ) {
        next(error);
      }
    }
    next(error);
  }
}
