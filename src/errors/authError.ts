import { BaseError } from './baseError';

type ErrorName =
  | 'INVALID_REFRESH_TOKEN'
  | 'MISSING_REFRESH_TOKEN'
  | 'NO_TOKENS_SENT'
  | 'USER_NOT_FOUND_FROM_REFRESH'
  | 'REFRESH_TOKEN_VERSION_MISMATCH';

export class AuthError extends BaseError<ErrorName> {
  constructor({
    name,
    message,
    stack,
  }: {
    name: ErrorName;
    message: string;
    stack?: any;
  }) {
    super({
      name,
      message,
      stack,
      level: 'Info',
    });
  }
}
