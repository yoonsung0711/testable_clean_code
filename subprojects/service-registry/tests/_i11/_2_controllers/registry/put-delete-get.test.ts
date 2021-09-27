import { Delete, Get, Put } from '@registry/controllers/registry/controllers'
import { createServiceRegistryContext, IServiceRegistryContext, ServiceRegistry } from '@registry/services/registry'
import { Request, Response, NextFunction } from 'express'

describe('Registry Controller', () => {
    let put: (req: Request, res: Response, next: NextFunction) => void
    let delete_: (req: Request, res: Response, next: NextFunction) => void
    let get: (req: Request, res: Response, next: NextFunction) => void
    let context: IServiceRegistryContext

    beforeAll(() => {
        context = createServiceRegistryContext(5)

        put = Put(ServiceRegistry(context))
        delete_ = Delete(ServiceRegistry(context))
        get = Get(ServiceRegistry(context))
    })

    describe('[case1: controller.login (if already loggined)=>]', () => {
        it('returns logginUser with status code 200', () => {
            const httpRequest: Partial<Request> = {}
            const httpResponse: Partial<Response> = {}
            const nextFunction: Partial<NextFunction> = {}

            put(httpRequest as Request, httpResponse as Response, nextFunction as NextFunction)
        })
    })

    describe('[case2: controller.login (not loggined && without pass and id)=>]', () => {
        it('returns users with status code 401', () => {
            const httpRequest: Partial<Request> = {}
            const httpResponse: Partial<Response> = {}
            const nextFunction: Partial<NextFunction> = {}

            delete_(httpRequest as Request, httpResponse as Response, nextFunction as NextFunction)
        })
    })


    describe('[case3: controller.login (not loggined && with wrong pass)=>]', () => {
        it('returns userProfile with status code 200', () => {
            const httpRequest: Partial<Request> = {}
            const httpResponse: Partial<Response> = {}
            const nextFunction: Partial<NextFunction> = {}

            get(httpRequest as Request, httpResponse as Response, nextFunction as NextFunction)
        })
    })
})
