import { LogLevels } from '../types';

export class BaseError<T extends string> extends Error {
  name: T;
  message: string;
  stack: any;
  level: LogLevels;

  constructor({
    name,
    message,
    stack,
    level,
  }: {
    name: T;
    message: string;
    stack?: any;
    level: LogLevels;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.stack = stack;
    this.level = level;
  }
}
