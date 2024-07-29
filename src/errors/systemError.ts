import { BaseError } from './baseError';
import { LogLevels } from '../types'

type ErrorName =
  | 'MISSING_ENVIRONMENT_VARIABLES'
  | 'DATABASE_CONNECTION_FAILURE';

export class CriticalError extends BaseError<ErrorName> {
  constructor({
    name,
    message,
    stack
  }: {
    name: ErrorName,
    message: string,
    stack?: any,
  }) {
    super({
      name,
      message,
      stack,
      level: LogLevels.FATAL
    })
  }
}
