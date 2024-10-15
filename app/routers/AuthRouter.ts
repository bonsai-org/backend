import { Router } from 'express'
import { ValidationMiddlewares, ValidationChains, JWTMiddleWare } from '../middleware'
import { AuthControllers } from '../controllers/AuthControllers'

const AuthRouter = Router()

AuthRouter.post(
    '/signup',
    ValidationMiddlewares.processFormData(ValidationChains.signup),
    AuthControllers.signup
)

AuthRouter.post(
    '/login',
    ValidationMiddlewares.processFormData(ValidationChains.login),
    AuthControllers.login
)

AuthRouter.post(
    '/logout',
    JWTMiddleWare.authenticate,
    AuthControllers.logout
)

AuthRouter.get(
    '/startup',
    JWTMiddleWare.authenticateWithUser,
    AuthControllers.startUp,
)

export default AuthRouter