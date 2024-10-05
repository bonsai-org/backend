import { DataError, UserError, UserErrorNames } from './data-errors/data-errors'
import { SystemError, DatabaseError, DatabaseErrorNames, EnvironmentError, EnvironmentErrorNames, UnknownException, UnknownExceptionNames } from './system-errors/system-error'
import { ThirdPartyError, BcryptError, BcryptErrorNames } from './third-party-errors/third-party-error'

export const Errors = {
    ParentErrors: { DataError, SystemError, ThirdPartyError },
    DataError: { UserError },
    SystemError: { DatabaseError, EnvironmentError, UnknownException },
    ThirdPartyError: { BcryptError }
}

export {
    LogLevels,
    MongoServerErrorCodes
} from './types'

export { UserErrorNames, DatabaseErrorNames, BcryptErrorNames, EnvironmentErrorNames, UnknownExceptionNames }