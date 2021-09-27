import { IRegistryController } from '@registry/controllers'
import { stubRegistryController } from '@tests/helpers/controllers'
import { createRegistryRouteTestServer } from '@tests/helpers/route-test-servers'
import request, { Request, Response } from 'supertest'

describe('User Router', () => {
    let spy: jest.Mock<any, any>

    beforeAll(() => {
        spy = jest.fn()
    })

    it('PUT: /registries => controller.put ', (done) => {
        const controller: IRegistryController = { ...stubRegistryController, put: spy }

        void request(createRegistryRouteTestServer(controller, spy))
            .put('/registries')
            .query({
                servicename: 'service-feed',
                serviceversion: '1.0.0',
                serviceport: 4010
            })
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })

    it('DELETE: /registries => controller.delete_ ', (done) => {
        const controller: IRegistryController = { ...stubRegistryController, delete_: spy }

        void request(createRegistryRouteTestServer(controller, spy))
            .delete('/registries')
            .query({
                servicename: 'service-feed',
                serviceversion: '1.0.0',
                serviceport: 4010
            })
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })

    it('GET: /registries => controller.get ', (done) => {
        const controller: IRegistryController = { ...stubRegistryController, get: spy }

        void request(createRegistryRouteTestServer(controller, spy))
            .get('/registries')
            .query({
                servicename: 'service-feed',
                serviceversion: '1.0.0',
                serviceport: 4010
            })
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })

})