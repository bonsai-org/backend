import { User } from '../data/User';
import { Request, Response, NextFunction } from 'express';
import { BcryptError } from '../errors/third-party-errors/bcrypt';
import { genSalt, hash } from 'bcrypt';
import { HttpStatusCode } from '../types';
import { sendAuthTokens } from '../middleware/jwts';
import { UserError } from '../errors/data-errors/user';

/*
 * This function will take the user's plain text password as input as well
 * as the number of rounds used for hashing. If an error occurs on bcrypt's
 * end due to genSalt or hash throwing an error, we still throw a new SignUpError
 * and attach the bcrypt error to the cause property, so it can properly be logged.
 */

async function hashPassword(password: string, rounds: number): Promise<string> {
  try {
    let salt = await genSalt(rounds);
    let hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new BcryptError({
      name: 'HASHING_ERROR',
      message: `Bcrypt failed in signup's hashPassword function`,
      stack: error
    })
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
    let { username, password, email } = req.signupRequest
    let hashedPassword = await hashPassword(password, 12);
    let user = await User.createUser({ username, hashedPassword, email })
    sendAuthTokens(res, user);
    return res
      .status(HttpStatusCode.Ok)
      .json({ username: user.username, profilePhoto: user.profilePhoto || '' })
  } catch (error) {
    if (error instanceof UserError) {
      if (error.name === 'DUPLICATE_KEY') {
        return res
          .status(HttpStatusCode.Conflict)
          .json({ message: { duplicateKey: error.duplicateKey } })
      }
    }
  }
}
