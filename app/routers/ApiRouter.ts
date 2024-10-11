import { Router } from 'express'
import AuthRouter from './AuthRouter'
import BonsaiRouter from './BonsaiRouter'

const ApiRouter = Router()

ApiRouter.use('/auth', AuthRouter)

ApiRouter.use('/bonsai', BonsaiRouter)

export default ApiRouter