import { BonsaiServicesError, DataError, UserServicesError, UserServicesErrorNames, BonsaiServicesErrorNames, BonsaiChapterServicesError, BonsaiChapterServicesErrorNames } from './data-errors/data-errors'
import { SystemError, DatabaseError, DatabaseErrorNames, EnvironmentError, EnvironmentErrorNames, UnknownException, UnknownExceptionNames, BullMQError, BullMQErrorNames } from './system-errors/system-error'
import { ThirdPartyError, BcryptError, BcryptErrorNames, JWTError, JWTErrorNames } from './third-party-errors/third-party-error'

export const Errors = {
    ParentErrors: { DataError, SystemError, ThirdPartyError },
    DataError: { UserServicesError, BonsaiServicesError, BonsaiChapterServicesError },
    SystemError: { DatabaseError, EnvironmentError, UnknownException, BullMQError },
    ThirdPartyError: { BcryptError, JWTError }
}

export {
    LogLevels,
    MongoServerErrorCodes
} from './types'

export {
    UserServicesErrorNames,
    DatabaseErrorNames,
    BcryptErrorNames,
    EnvironmentErrorNames,
    UnknownExceptionNames,
    JWTErrorNames,
    BonsaiServicesErrorNames,
    BonsaiChapterServicesErrorNames,
    BullMQErrorNames
}