import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode, FormFields } from '../types';
import { getDirtyFields } from '../utils/middlewares';

export function sanitizeSignUp(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  let dangerousEntries = getDirtyFields(req, [
    FormFields.USERNAME,
    FormFields.EMAIL,
  ]);
  if (dangerousEntries.length !== 0) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ error: 'Invalid Entries', dangerousEntries });
  }
  return next();
}
