import express, { Express } from 'express'

import { IAuthController } from '@gateway/controllers'
import { IFeedController } from '@gateway/controllers'
import { IUserController } from '@gateway/controllers'

import { AuthRouter } from '@gateway/routers'
import { UserRouter } from '@gateway/routers'
import { FeedRouter } from '@gateway/routers'

import { fakeAuthMiddlewareWithLoginUid } from './handlers'
import { stubAuthMiddleware } from './handlers'

export const createAuthRouteTestServer
    = (controller: IAuthController, spy: jest.Mock<any, any>): Express => {
        spy.mockImplementation((req: express.Request, res: express.Response) => {
            res.status(200)
            res.json('')
        })
        const app = express()
        app.use(express.json())
        app.use(AuthRouter(controller, stubAuthMiddleware))
        return app
    }


export const createUserRouteTestServer
    = (controller: IUserController, spy: jest.Mock<any, any>): Express => {
        spy.mockImplementation((req: express.Request, res: express.Response) => {
            res.status(200)
            res.json('')
        })
        const app = express()
        app.use(express.json())
        app.use(UserRouter(controller, stubAuthMiddleware))
        return app
    }

export const createFeedRouteTestServer
    = (controller: IFeedController, spy: jest.Mock<any, any>): Express => {
        spy.mockImplementation((req: express.Request, res: express.Response) => {
            res.status(200)
            res.json('')
        })
        const app = express()
        app.use(express.json())
        app.use(FeedRouter(controller, stubAuthMiddleware))
        return app
    }

export const createFeedTestServerWithLoginUid
    = (login_uid: string) => (controller: IFeedController, spy: jest.Mock<any, any>): Express => {
        spy.mockImplementation((req: express.Request, res: express.Response) => {
            res.status(200)
            res.json('')
        })
        const app = express()
        app.use(express.json())
        app.use(FeedRouter(controller, fakeAuthMiddlewareWithLoginUid(login_uid)))
        return app
    }
