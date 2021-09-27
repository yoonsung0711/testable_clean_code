import request, { Request, Response } from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { tokenizer } from '@gateway/services/auth/util'
import { default as config } from '@config/index'
import { createAuthTestWebServer } from '@tests/helpers/i11-test-servers'

describe('Auth Routers', () => {
    let conn: Connection

    beforeAll(() => {
        conn = getConnection()
    })

    describe('[feature: user-authentication]', () => {
        describe('POST: /auth/login ', () => {
            it('case1: if already loggined', (done) => {
                const { token } = tokenizer.sign({ userUid: '4fae' }, config.server.token.secret, { expiresIn: 3600 })
                const app = createAuthTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .set('Cookie', [`Authorization=${token as string}`])
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body).toEqual({
                            "logginUser": {
                                "feedCursor": 0,
                                "feeds": [],
                                "followers": [],
                                "leaders": [],
                                "name": "Michael",
                                "posts": [],
                                "userId": "b4125da5",
                                "uuid": "4fae"
                            }
                        })
                        done()
                    })
            })

            it('case2: not loggined without pass and id', (done) => {
                const app = createAuthTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .end((_err: Request, _res: Response) => {
                        expect(_res.status).toEqual(401)
                        expect(_res.body).toEqual({
                            "message": "not authorized"
                        })
                        done()
                    })
            })

            it('case3: with right pass and id', (done) => {
                const app = createAuthTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .send({
                        userUid: '3c07',
                        pass: 'WrongPassword'
                    })
                    .end((_err: Request, _res: Response) => {
                        expect(_res.status).toEqual(402)
                        expect(_res.body).toEqual({
                            "message": "not authenticated"
                        })
                        done()
                    })
            })

            it('case4: not loggined with right pass', (done) => {
                const app = createAuthTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .send({
                        userUid: '3c07',
                        pass: 'Mia'
                    })
                    .end((_err: Request, _res: Response) => {
                        expect(_res.status).toEqual(200)
                        expect(_res.body).toEqual({
                            "logginUser": {
                                "feedCursor": 0,
                                "feeds": [],
                                "followers": [],
                                "leaders": [],
                                "name": "Mia",
                                "posts": [],
                                "userId": "817c77ba",
                                "uuid": "3c07"
                            }
                        })
                        done()
                    })
            })
        })
    })
})
