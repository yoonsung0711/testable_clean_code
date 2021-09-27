import { mock, MockProxy } from 'jest-mock-extended'
import { IFeedDatabase } from '@feed/database'

import { PublishFeed } from '@feed/services/feed/services'

describe('Feed Services', () => {
    let mockFeedDatabase: MockProxy<IFeedDatabase> & IFeedDatabase
    let publishFeed: ({ msg, writerUid }: { msg: string, writerUid: string }) => Promise<string>

    beforeAll(() => {
        mockFeedDatabase = mock<IFeedDatabase>()
        publishFeed = PublishFeed(mockFeedDatabase)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('[POST: /feeds: controller.postFeed =>]', () => {

        it('service.publishFeed({ writerUid, msg }) => userDB.readFeeds(userUid)', async () => {
            await publishFeed({ writerUid: '4fae', msg: 'this is feed service test' })
            expect(mockFeedDatabase.pushFeed).toBeCalledWith({ writerUid: '4fae', msg: 'this is feed service test' })
        })
    })
})