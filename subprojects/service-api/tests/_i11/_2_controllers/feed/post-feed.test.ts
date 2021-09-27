import { Request } from 'express'
import { Connection, getConnection } from 'typeorm'

import { PostFeed } from '@feed/controllers/feed/controllers'
import { createFeedTestService } from '@tests/helpers/services'
import { IHttpResponse } from '@feed/typings'

describe('Feed Controller', () => {
    let conn: Connection

    let postFeed: (httpRequest: Partial<Request>) => Promise<IHttpResponse>

    beforeAll(() => {
        conn = getConnection()

        postFeed = PostFeed(createFeedTestService(conn))
    })

    describe('[POST: /feeds => ]', () => {
        it('returns feed with status code 200 <= service.publishFeed({ writerUid, msg })', async () => {
            const httpRequest: Partial<Request> = {
                body: {
                    login_user_uid: '3c07',
                    msg: 'this is unit test'
                }
            }
            const result = await postFeed(httpRequest)
            expect(result.statusCode).toEqual(200)
            expect(result.body).toEqual({ "msg": "posted" })
        })
    })
})
