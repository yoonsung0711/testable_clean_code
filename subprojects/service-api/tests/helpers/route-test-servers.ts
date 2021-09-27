import express, { Express } from 'express'

import { IFeedController } from '@feed/controllers'
import { IUserController } from '@feed/controllers'

import { UserRouter } from '@feed/routers'
import { FeedRouter } from '@feed/routers'

export const createUserRouteTestServer
    = (controller: IUserController, spy: jest.Mock<any, any>): Express => {
        spy.mockImplementation((req: express.Request, res: express.Response) => {
            res.status(200)
            res.json('')
        })
        const app = express()
        app.use(express.json())
        app.use(UserRouter(controller))
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
        app.use(FeedRouter(controller))
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
        app.use(FeedRouter(controller))
        return app
    }
