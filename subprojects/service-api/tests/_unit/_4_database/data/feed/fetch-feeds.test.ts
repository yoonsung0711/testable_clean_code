import { mock, MockProxy } from 'jest-mock-extended'
import { Feed, IFeedAdaptor, IUserAdaptor } from '@feed/database'

import { FetchFeeds } from '@feed/database/typeorm/database/feed/impl'

describe('Feed Database', () => {
    let feed: MockProxy<IFeedAdaptor>
    let user: MockProxy<IUserAdaptor>
    let fetchFeeds: ({ writerUid }: { writerUid: string }) => Promise<Feed[]>

    beforeAll(() => {
        feed = mock<IFeedAdaptor>()
        user = mock<IUserAdaptor>()

        user.findUserFeedList.mockImplementation(async (_: string) => {
            return new Promise(res => setTimeout(res, 0, ['014a6ac3', '69b16e7b', 'e4dad600']))
        })

        fetchFeeds = FetchFeeds({ feed, user })
    })

    describe('[service.readFeeds({ writerUid }) =>]', () => {
        it('feedDB.fetchFeeds({ writerUid }) => user.findUserFeedList(writerUid)', async () => {
            await fetchFeeds({ writerUid: '4fae' })
            expect(user.findUserFeedList).toBeCalledTimes(1)
            expect(user.findUserFeedList).toBeCalledWith('4fae')
        })

        it('feedDB.fetchFeeds({ writerUid }) => feed.findFeedsByList(feedlist[])', async () => {
            await fetchFeeds({ writerUid: '4fae' })
            expect(feed.findFeedsByList).toBeCalledTimes(1)
            expect(feed.findFeedsByList).toBeCalledWith(['014a6ac3', '69b16e7b', 'e4dad600'])
        })
    })
})