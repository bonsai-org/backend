import { Router } from 'express'
import { ValidationMiddlewares, ValidationChains, JWTMiddleWare } from '../middleware'
import { BonsaiControllers } from '../controllers/BonsaiController'

const BonsaiRouter = Router()

BonsaiRouter.get('/', (req, res) => {
    res.send('got it')
})

BonsaiRouter.post(
    '/create',
    JWTMiddleWare.authenticate,
    ValidationMiddlewares.processFormData(ValidationChains.createBonsai),
    BonsaiControllers.create
)

BonsaiRouter.put(
    '/create/confirm/:bonsaihash',
    BonsaiControllers.confirmUpload
)

export default BonsaiRouter