import { Request } from 'express'
import { Connection, getConnection } from 'typeorm'
import { createUserTestService } from '@tests/helpers/services'
import { IHttpResponse } from '@feed/typings'

import { GetUsers } from '@feed/controllers/user/controllers'

describe('User Controller', () => {
    let conn: Connection

    let getUsers: (httpRequest: Partial<Request>) => Promise<IHttpResponse>

    beforeAll(() => {
        conn = getConnection()

        getUsers = GetUsers(createUserTestService(conn))
    })

    describe('[controller.getUsers =>]', () => {
        it('returns users with status code 200', async () => {
            const httpRequest: Partial<Request> = {}
            const result = await getUsers(httpRequest)
            expect(result.statusCode).toEqual(200)
            expect(result.body.length).toEqual(8)
        })

    })
})
