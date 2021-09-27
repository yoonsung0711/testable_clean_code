import request, { Request, Response } from 'supertest'
import express, { RequestHandler } from 'express'
import { Connection, getConnection } from 'typeorm'
import { TestWebServer } from '../helpers/server'
import { TestErrorLogger } from '../helpers/errloger'
import { createTestUserRouter } from '../helpers/conn';

describe('e2e test', () => {
    let conn: Connection

    beforeAll(() => {
        conn = getConnection()
    })

    it('feature: user-fetching', (done) => {
        const fakeAuthMiddleware = (req: express.Request, _res: express.Response, next: express.NextFunction): RequestHandler => {
            req.login_user_uid = '4fae'
            next()
            return
        }

        const app = TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createTestUserRouter(conn, fakeAuthMiddleware)).init()
        void request(app)
            .get('/users')
            .end((_err: Request, _res: Response) => {
                expect(_res.body.length).toEqual(8)
                done()
            })
    })
})