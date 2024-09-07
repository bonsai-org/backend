import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../types';

export function launchApplication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.loggedIn === true && typeof req.username === 'string') {
    return res
      .status(HttpStatusCode.Ok)
      .json({ loggedIn: true, username: req.username });
  }
  return res.status(HttpStatusCode.Unauthorized).json({ loggedIn: false });
}
