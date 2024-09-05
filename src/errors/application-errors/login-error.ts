import { BaseError } from '../baseError';
import { LogLevels } from '../../types';

type ErrorName =
  | 'NON_EXISTENT_USER'
  | 'INVALID_PASSWORD'
  | 'INTERNAL_API_ERROR'
  | 'MISSING_REQUIRED_FIELDS';

export class LoginError extends BaseError<ErrorName> {
  constructor({
    name,
    message,
    stack,
    level,
  }: {
    name: ErrorName;
    message: string;
    stack?: any;
    level: LogLevels;
  }) {
    super({
      name,
      message,
      stack,
      level,
    });
  }
}
