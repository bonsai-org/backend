import { Request, Response, NextFunction } from 'express'
import { HttpStatusCode } from '../types'

export function launchApplication(req: Request, res: Response, next: NextFunction) {
    if (req.loggedIn === true) {
        return res.status(HttpStatusCode.Ok).json({ loggedIn: true })
    }
    return res.status(HttpStatusCode.Unauthorized).redirect('/login')
}