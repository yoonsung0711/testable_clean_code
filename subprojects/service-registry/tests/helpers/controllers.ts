import { NextFunction, Request, Response } from 'express'
import { IRegistryController } from '@registry/controllers'

export const stubRegistryController: IRegistryController
    = {
    status: (req: Request, res: Response, next: NextFunction) => undefined,
    put: (req: Request, res: Response, next: NextFunction) => undefined,
    delete_: (req: Request, res: Response, next: NextFunction) => undefined,
    get: (req: Request, res: Response, next: NextFunction) => undefined,
}
