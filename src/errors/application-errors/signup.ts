import { ApplicationError } from './application-error';

type ErrorName =
  | 'USERNAME_IN_USE'
  | 'EMAIL_IN_USE'
  | 'USERNAME_AND_EMAIL_IN_USE'
  | 'INTERNAL_API_ERROR'
  | 'PASSWORD_HASH_ERROR'
  | 'MISSING_REQUIRED_FIELDS';

export class SignUpError extends ApplicationError<ErrorName> {
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
    });
  }
}
