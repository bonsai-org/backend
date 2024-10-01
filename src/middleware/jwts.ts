/// <reference types="../types/express.d.ts" />
import { __prod__ } from '../utils/constants';
import { NextFunction, Request, Response } from 'express';
import { User } from '../data/User';
import {
  RefreshTokenData,
  AccessTokenData,
  NewlyGeneratedTokens,
  AuthorizedTokenData,
} from '../types';
import { AuthError } from '../errors/authError';
import * as jwt from 'jsonwebtoken';

const cookieOpts = {
  httpOnly: true,
  secure: __prod__,
  sameSite: 'lax',
  path: '/',
  domain: __prod__ ? `.${process.env.DOMAIN}` : '',
  maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
} as const;

function createAuthTokens(user: User): NewlyGeneratedTokens {
  let refreshToken = jwt.sign(
    { username: user.username, refreshTokenVersion: user.refreshToken },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '30d',
    },
  );
  let accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '5min',
    },
  );
  return { accessToken, refreshToken };
}

// We need either the accessToken or the refreshToken to continue. Supplying neither, will
// result in a 401.

export function getCookieValues(req: Request) {
  let { id, rid } = req.cookies;
  if (typeof id !== 'string' || typeof rid !== 'string') {
    throw new AuthError({
      name: 'NO_TOKENS_SENT',
      message: 'User sent no tokens with request',
    });
  }
  return { accessToken: id, refreshToken: rid };
}

export function sendAuthTokens(res: Response, user: User) {
  let { accessToken, refreshToken } = createAuthTokens(user);
  res.cookie('id', accessToken, cookieOpts);
  res.cookie('rid', refreshToken, cookieOpts);
}

export function clearAuthCookies(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.clearCookie('id', cookieOpts);
  res.clearCookie('rid', cookieOpts);
}

function verifyAccessToken(accessToken: string): AccessTokenData | null {
  try {
    let data = <AccessTokenData>(
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    );
    return {
      username: data.username,
    };
  } catch (error) {
    return null;
  }
}

function verifyRefreshToken(refreshToken: string): RefreshTokenData {
  try {
    let data = <RefreshTokenData>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );
    return data;
  } catch (error) {
    throw new AuthError({
      name: 'INVALID_REFRESH_TOKEN',
      message:
        'User failed to provide valid tokens and therefore their request must be denied ;-(',
    });
  }
}

/*
 * Here is the flow of whats happening with checkTokens
 *
 *
 * 1. First verify accessToken and return the username from the accessToken if it is valid
 * 2. If accessToken is invalid, then first make sure that the user supplied a refreshToken. If there is no refresh
 *    token supplied, then throw an error and immediately send a 401 to the client. If the client did supply
 *    a refreshToken, then attempt to verify it. If you are unable to verify it, return a 401.
 * 3. If the refreshToken is valid, we will then have to make sure that the token's version matches the version
 *    that is saved on the user record. To do this, we have to query the user's record from our db with the username
 *    that is supplied via the JWT. If the two versions don't match, then we will have to send a 401.
 * 4. If all of these check out, we will first send the user a new accessToken and fresh refreshToken
 *    and then return the username and user record to the caller.
 *
 *  * NOTE!!! If we are able to verify an accessToken, checkTokens will only return a username.
 *  If we end up having to verify a refreshToken, then checkTokens will return the username
 *  along with the full user record!
 *
 * What still needs to be addressed
 *  - I am not currently handling a potential mongoError within checkTokens
 *
 */

export async function checkTokens(
  accessToken: string,
  refreshToken: string,
  res: Response,
): Promise<AuthorizedTokenData> {
  let accessTokenData = verifyAccessToken(accessToken);
  if (accessTokenData) {
    return accessTokenData;
  }
  if (!refreshToken) {
    throw new AuthError({
      name: 'MISSING_REFRESH_TOKEN',
      message: 'No refresh token given after access token failed',
    });
  }
  let refreshTokenData = verifyRefreshToken(refreshToken);
  let user = await User.getByUsername({ username: refreshTokenData.username })
  if (user === null) {
    throw new AuthError({
      name: 'USER_NOT_FOUND_FROM_REFRESH',
      message: 'Unable to find user with username supplied via refresh token',
    });
  } else if (refreshTokenData.refreshTokenVersion !== user.refreshToken) {
    throw new AuthError({
      name: 'REFRESH_TOKEN_VERSION_MISMATCH',
      message: 'User has supplied an outdated refresh token',
    });
  }
  sendAuthTokens(res, user);
  return {
    username: user.username,
    user: user,
  };
}

export async function checkTokensMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    let { accessToken, refreshToken } = getCookieValues(req);
    let { username } = await checkTokens(accessToken, refreshToken, res);
    req.loggedIn = true;
    req.username = username;
    return next();
  } catch (error) {
    if (error instanceof AuthError) {
      if (
        error.name === 'INVALID_REFRESH_TOKEN' ||
        error.name === 'MISSING_REFRESH_TOKEN' ||
        error.name === 'USER_NOT_FOUND_FROM_REFRESH' ||
        error.name === 'REFRESH_TOKEN_VERSION_MISMATCH' ||
        error.name === 'NO_TOKENS_SENT'
      ) {
        req.loggedIn = false;
        return next();
      }
    }
    return next(error);
  }
}
