import { User } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { SignUpError } from '../errors/application-errors/signup-error';
import { genSalt, hash } from 'bcrypt';
import { HttpStatusCode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getSignupVariables } from '../utils/required-field-checkers';

/*
 * This function is responsible for checking that a user with the supplied
 * username or password from signup does not already exist in the database.
 *
 * The idea is that it first queries the DB using the User.findByEmailorUsername
 * method for a document where either the username field is equal to the supplied
 * username in req.body or the supplied email field is equal to the supplied email
 * in req.body. The User.findByEmailorUsername method will return an object that
 * contains two fields: user and error. If a user is found to having a matching
 * email address and or username, the user field will contain the document and
 * error will contain null. If no user is found, then the user field will be null and
 * error will be null, indicating that you are clear to continue signing the user up
 * for an account. If an error occurs at anytime while making the query, the user
 * field will be set to null and the error field will contain the related mongoose
 * error, which will then be propagated back to the caller.
 */

async function checkIfUserExists(
  username: string,
  email: string,
): Promise<void> {
  let { user, error } = await User.findByEmailOrUsername(username, email);
  if (error) {
    throw new SignUpError({
      name: 'INTERNAL_API_ERROR',
      message: `Failed to query mongoDB for username ${username} and email ${email}`,
      level: 'Fatal',
      stack: error,
    });
  }
  if (user) {
    if (user.username === username && user.email === email) {
      throw new SignUpError({
        name: 'USERNAME_AND_EMAIL_IN_USE',
        message: 'Username and email in use by an existing user',
        level: 'Info',
      });
    } else if (user.username === username) {
      throw new SignUpError({
        name: 'USERNAME_IN_USE',
        message: 'Username in use by an existing user',
        level: 'Info',
      });
    } else if (user.email === email) {
      throw new SignUpError({
        name: 'EMAIL_IN_USE',
        message: 'Email in use by an existing user',
        level: 'Info',
      });
    }
  }
}

/*
 * This function will take the user's plain text password as input as well
 * as the number of rounds used for hashing. If an error occurs on bcrypt's
 * end due to genSalt or hash throwing an error, we still throw a new SignUpError
 * and attach the bcrypt error to the cause property, so it can properly be logged.
 */

async function hashPassword(
  password: string,
  rounds: number,
): Promise<[string, string]> {
  try {
    let salt = await genSalt(rounds);
    let hashedPassword = await hash(password, salt);
    return [salt, hashedPassword];
  } catch (error) {
    throw new SignUpError({
      name: 'PASSWORD_HASH_ERROR',
      message: "An error occured while hashing users' password",
      level: 'Fatal',
      stack: error,
    });
  }
}

/*
 * The signup function signs a user up for an account, given that there are no
 * users that already exist in the database with the supplied username and email.
 * If no users exist with either of these, the supplied password is hashed
 * and is stored on the user document along with the salt generated for the
 * hash.
 *
 * This function assumes that the username, password, and email field have all
 * been validated using some combination of frontend and backend form validation.
 */

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    let { username, password, email } = getSignupVariables(req);
    await checkIfUserExists(username, email);
    let [salt, hashedPassword] = await hashPassword(password, 12);
    let newUser = new User({
      username,
      password: hashedPassword,
      email,
      salt,
      UUID: uuidv4(),
    });
    await newUser.save();
    return res
      .status(HttpStatusCode.Ok)
      .json({ message: 'Welcome to bonsai org!' });
  } catch (error) {
    if (error instanceof SignUpError) {
      if (
        error.name === 'EMAIL_IN_USE' ||
        error.name === 'USERNAME_IN_USE' ||
        error.name === 'USERNAME_AND_EMAIL_IN_USE'
      ) {
        return res
          .status(HttpStatusCode.Conflict)
          .json({ message: error.message });
      } else if (
        error.name === 'INTERNAL_API_ERROR' ||
        error.name === 'PASSWORD_HASH_ERROR' ||
        error.name === 'MISSING_REQUIRED_FIELDS'
      ) {
        next(error);
      }
    }
    next(error);
  }
}
