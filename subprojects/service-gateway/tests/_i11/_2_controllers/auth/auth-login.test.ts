import { Request } from 'express'
import { Connection, getConnection } from 'typeorm'

import { IHttpResponse } from '@gateway/typings'
import { LoginController } from '@gateway/controllers/auth/controllers'
import { authTools } from '@gateway/services/auth/util'

import { createAuthTestService } from '@tests/helpers/services'

describe('Auth Controller', () => {
    let conn: Connection
    let login: (httpRequest: Partial<Request>) => Promise<IHttpResponse>

    beforeAll(() => {
        conn = getConnection()
        login = LoginController(createAuthTestService(conn), authTools)
    })

    describe('[case1: controller.login (if already loggined)=>]', () => {
        it('returns logginUser with status code 200', async () => {
            const httpRequest: Partial<Request> = {
                login_user_uid: '4fae'
            }
            const result = await login(httpRequest)
            expect(result.statusCode).toEqual(200)
            expect(result.body).toEqual({ "message": "logined" })
        })
    })

    describe('[case2: controller.login (not loggined && without pass and id)=>]', () => {
        it('returns users with status code 401', async () => {
            const httpRequest: Partial<Request> = {}
            const result = await login(httpRequest)
            expect(result.statusCode).toEqual(401)
            expect(result.body).toEqual({ "message": "not authorized" })
        })
    })


    describe('[case3: controller.login (not loggined && with wrong pass)=>]', () => {
        it('returns userProfile with status code 200', async () => {
            const httpRequest: Partial<Request> = {
                body: {
                    userUid: '4fae',
                    pass: 'WrongPassword'
                }
            }
            const result = await login(httpRequest)
            expect(result.statusCode).toEqual(402)
            expect(result.body).toEqual({ "message": "not authenticated" })
        })
    })


    describe('[case4: controller.login (not loggined with right pass and id)=>]', () => {
        it('returns userProfile with status code 200', async () => {
            const httpRequest: Partial<Request> = {
                body: {
                    userUid: '4fae',
                    pass: 'Michael'
                }
            }
            const result = await login(httpRequest)
            expect(result.statusCode).toEqual(200)
            expect(result.body).toEqual({ "message": "logined" })
        })
    })


})
