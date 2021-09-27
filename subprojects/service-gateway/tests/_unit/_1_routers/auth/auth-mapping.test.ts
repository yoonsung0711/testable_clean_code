import { IAuthController } from '@gateway/controllers'
import { stubAuthController } from '@tests/helpers/controllers'
import { createAuthRouteTestServer } from '@tests/helpers/route-test-servers'
import request, { Request, Response } from 'supertest'

describe('Auth Router', () => {
    let spy: jest.Mock<any, any>

    beforeAll(() => {
        spy = jest.fn()
    })

    it('POST: /auth/logout => controller.login ', (done) => {
        const controller: IAuthController = { ...stubAuthController, logout: spy }

        void request(createAuthRouteTestServer(controller, spy))
            .post('/auth/logout')
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })

    it('POST: /auth/login => controller.login ', (done) => {
        const controller: IAuthController = { ...stubAuthController, login: spy }

        void request(createAuthRouteTestServer(controller, spy))
            .post('/auth/login')
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })
})