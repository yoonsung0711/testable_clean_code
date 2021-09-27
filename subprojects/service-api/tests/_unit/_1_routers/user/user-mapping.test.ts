import { IUserController } from '@feed/controllers'
import { stubUserController } from '@tests/helpers/controllers'
import { createUserRouteTestServer } from '@tests/helpers/route-test-servers'
import request, { Request, Response } from 'supertest'

describe('User Router', () => {
    let spy: jest.Mock<any, any>

    beforeAll(() => {
        spy = jest.fn()
    })

    it('PUT: /users/:userUid => controller.putUser ', (done) => {
        const controller: IUserController = { ...stubUserController, putUser: spy }

        void request(createUserRouteTestServer(controller, spy))
            .put('/users/9f9e')
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })

    it('GET: /users => controller.getUsers ', (done) => {
        const controller: IUserController = { ...stubUserController, getUsers: spy }

        void request(createUserRouteTestServer(controller, spy))
            .get('/users')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })

    it('GET: /users/:userUid => controller.getUser ', (done) => {
        const controller: IUserController = { ...stubUserController, getUser: spy }

        void request(createUserRouteTestServer(controller, spy))
            .get('/users/4fae')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })
})