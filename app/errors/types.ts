export type LogLevels = 'Info' | 'Warn' | 'Error' | 'Fatal';

export enum MongoServerErrorCodes {
    DuplicateKey = 11000
}

export { UserErrorNames } from './data-errors/user'
export { DatabaseErrorNames } from './system-errors/database'
export { BcryptErrorNames } from './third-party-errors/bcrypt'