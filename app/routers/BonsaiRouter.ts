import { Router } from 'express'
import { ValidationMiddlewares, ValidationChains, JWTMiddleWare } from '../middleware'
import { BonsaiControllers } from '../controllers/BonsaiController'

const BonsaiRouter = Router()

BonsaiRouter.post(
    '/create',
    JWTMiddleWare.authenticate,
    // ValidationMiddlewares.processFormData(ValidationChains.createBonsai),
    BonsaiControllers.create
)

BonsaiRouter.get(
    '/gib',
    BonsaiControllers.gib
)

// this probably needs some authentication to happen here
// also, want †o make sure that this only gets called once 
// for every bonsai 

BonsaiRouter.put(
    '/create/confirm/:bonsaihash',
    BonsaiControllers.confirmUpload
)

export default BonsaiRouter