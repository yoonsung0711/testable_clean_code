import { Request } from 'express'
import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { IFeedService } from '@feed/services'

import { PostFeed } from '@feed/controllers/feed/controllers'

describe('Feed Controller', () => {
    let mockService: MockProxy<IFeedService>
    let postFeed: (httpRequest: Request) => Promise<any>

    beforeAll(() => {
        mockService = mock<IFeedService>()
        postFeed = PostFeed(mockService)
    })

    describe('[POST: /feeds => ]', () => {
        it('controller.postFeed => service.publishFeed({ writerUid, msg })', async () => {
            const httpRequest: Partial<Request> = {
                body: {
                    login_user_uid: '3c07',
                    msg: 'this is unit test'
                }
            }
            await postFeed(httpRequest as Request)
            expect(mockService.publishFeed).toHaveBeenCalledWith({ writerUid: '3c07', msg: 'this is unit test' })
        })
    })
})

