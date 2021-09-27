import { RequestHandler, NextFunction, Request, Response } from 'express'

export const stubAuthMiddleware: RequestHandler
    = (req: Request, res: Response, next: NextFunction) => {
        next()
    }

export const fakeAuthMiddlewareWithLoginUid: (login_user_uid: string) => RequestHandler
    = (login_uid: string) => (req: Request, res: Response, next: NextFunction) => {
        req.login_user_uid = login_uid
        next()
    }

export const stubHandler: RequestHandler
    = (req: Request, res: Response, next: NextFunction) => {
        next()
    }

