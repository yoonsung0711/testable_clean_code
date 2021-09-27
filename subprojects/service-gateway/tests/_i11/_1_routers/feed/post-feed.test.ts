import request, { Request, Response } from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { default as config } from '@config/index'

import { tokenizer } from '@gateway/services/auth/util'
import { createFeedTestWebServer } from '@tests/helpers/i11-test-servers'


describe('Feed Routers', () => {
    let conn: Connection

    beforeAll(() => {
        conn = getConnection()
    })

    describe('[feature: feed-publishing =>]', () => {
        it('POST: /feeds <= controller.postFeed', (done) => {
            const { token } = tokenizer.sign({ userUid: '3c07' }, config.server.token.secret, { expiresIn: 3600 })
            const app = createFeedTestWebServer(conn)

            void request(app)
                .post('/feeds') // Mia
                .set('Cookie', [`Authorization=${token}`])
                .send({
                    msg: 'this message is for i11 router test'
                })
                .end((_err: Request, _res: Response) => {
                    expect(_res.body).toEqual({ "msg": "posted" })
                    done()
                })
        })
    })
})