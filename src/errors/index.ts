import { LoginError } from './application-errors/login'
import { SignUpError } from './application-errors/signup'
import { AuthError } from './application-errors/auth'
import { MongoError } from './system-errors/mongodb'

export const ApplicationErrors = {
    LoginError,
    SignUpError,
    AuthError
}

export const SystemErrors = {
    MongoError
}

export { ThirdPartyError } from './third-party'

