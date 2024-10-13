import { BonsaiError, DataError, UserError, UserErrorNames, BonsaiErrorNames, BonsaiChapterError, BonsaiChapterErrorNames } from './data-errors/data-errors'
import { SystemError, DatabaseError, DatabaseErrorNames, EnvironmentError, EnvironmentErrorNames, UnknownException, UnknownExceptionNames, BullMQError, BullMQErrorNames } from './system-errors/system-error'
import { ThirdPartyError, BcryptError, BcryptErrorNames, JWTError, JWTErrorNames } from './third-party-errors/third-party-error'

export const Errors = {
    ParentErrors: { DataError, SystemError, ThirdPartyError },
    DataError: { UserError, BonsaiError, BonsaiChapterError },
    SystemError: { DatabaseError, EnvironmentError, UnknownException, BullMQError },
    ThirdPartyError: { BcryptError, JWTError }
}

export {
    LogLevels,
    MongoServerErrorCodes
} from './types'

export {
    UserErrorNames,
    DatabaseErrorNames,
    BcryptErrorNames,
    EnvironmentErrorNames,
    UnknownExceptionNames,
    JWTErrorNames,
    BonsaiErrorNames,
    BonsaiChapterErrorNames,
    BullMQErrorNames
}