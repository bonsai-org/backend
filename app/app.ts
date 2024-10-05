import { Errors } from './errors'
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { StatusCodes } from 'http-status-codes'

const app = express()

app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'dev') {
    app.use(
        cors({
            origin: [process.env.FRONTEND_DEV_SEVER as string],
            credentials: true
        }),
        morgan('dev')
    )
}

app.get('*', (req, res) => {
    throw new Error('hi')
})

app.listen(process.env.PORT, () => {
    console.log('Listening')
})

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (
        err instanceof Errors.ParentErrors.DataError ||
        err instanceof Errors.ParentErrors.ThirdPartyError ||
        err instanceof Errors.ParentErrors.SystemError
    ) {
        console.log(err.name)
        console.log(err.message)
    }
    if (
        err instanceof Errors.ParentErrors.SystemError ||
        (typeof err === 'object' && err !== null && 'stack' in err)
    ) {
        console.log(err.stack)
    }

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
})