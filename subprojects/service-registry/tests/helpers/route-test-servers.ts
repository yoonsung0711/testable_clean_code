import { IRegistryController } from '@registry/controllers'
import { RegistryRouter } from '@registry/routers'
import express, { Express } from 'express'

export const createRegistryRouteTestServer
    = (controller: IRegistryController, spy: jest.Mock<any, any>): Express => {
        spy.mockImplementation((req: express.Request, res: express.Response) => {
            res.status(200)
            res.json('')
        })
        const app = express()
        app.use(express.json())
        app.use(RegistryRouter(controller))
        return app
    }

