import request, { Request, Response } from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { createRegistryTestWebServer } from '@tests/helpers/i11-test-servers'

describe('Registry Router', () => {
    let conn: Connection

    beforeAll(() => {
        conn = getConnection()
    })

    describe('[feature: user-authentication]', () => {
        describe('GET: /registries ', () => {
            it('case1: if already loggined', (done) => {
                const app = createRegistryTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body).toEqual('')
                        done()
                    })
            })

            it('case2: not loggined without pass and id', (done) => {
                const app = createRegistryTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body).toEqual('')
                        done()
                    })
            })

            it('case3: with right pass and id', (done) => {
                const app = createRegistryTestWebServer(conn)

                void request(app)
                    .post('/auth/login') // Michael
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body).toEqual('')
                        done()
                    })
            })
        })
    })
})
