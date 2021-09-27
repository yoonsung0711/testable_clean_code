/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

export const TestErrorLogger
    = (error: any, req: Request, res: Response, _: NextFunction): ErrorRequestHandler => {
        res.status(error.status || 500)
        console.log(error)
        res.json({
            error: {
                message: error.message
            }
        })
        return
    }