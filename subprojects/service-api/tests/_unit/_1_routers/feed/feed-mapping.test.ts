import { IFeedController } from '@feed/controllers'
import { stubFeedController } from '@tests/helpers/controllers'
import { createFeedRouteTestServer } from '@tests/helpers/route-test-servers'
import request, { Request, Response } from 'supertest'

describe('Feed Router', () => {
    let spy: jest.Mock<any, any>

    beforeAll(() => {
        spy = jest.fn()
    })

    it('GET: /feeds => controller.getFeeds ', (done) => {
        const controller: IFeedController = { ...stubFeedController, getFeeds: spy }

        void request(createFeedRouteTestServer(controller, spy))
            .get('/feeds')
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })
    
    it('POST: /feeds => controller.postFeed ', (done) => {
        const controller: IFeedController = { ...stubFeedController, postFeed: spy }

        void request(createFeedRouteTestServer(controller, spy))
            .post('/feeds')
            .end((_err: Request, _res: Response) => {
                expect(spy).toHaveBeenCalledTimes(1)
                done()
            })
    })
})