import { Router } from 'express'
import { ValidationMiddlewares, ValidationChains, JWTMiddleWare } from '../middleware'
import { AuthControllers } from '../controllers/AuthControllers'

const BonsaiRouter = Router()

BonsaiRouter.get('/', (req, res) => {
    res.send('got it')
})

BonsaiRouter.post('/create', (req, res) => {
    res.send('/create up')
})

export default BonsaiRouter