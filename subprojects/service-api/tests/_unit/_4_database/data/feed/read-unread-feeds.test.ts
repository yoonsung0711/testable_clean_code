import { mock, MockProxy } from 'jest-mock-extended'
import { Feed, IFeedAdaptor, IUserAdaptor } from '@feed/database'

import { FetchUnreadFeeds } from '@feed/database/typeorm/database/feed/impl'

describe('Feed Database', () => {
    let feed: MockProxy<IFeedAdaptor>
    let user: MockProxy<IUserAdaptor>

    let fetchUnreadFeeds: ({ loginUserUid, batchSize }: { loginUserUid: string; batchSize: number; }) => Promise<Feed[]>

    beforeAll(() => {
        feed = mock<IFeedAdaptor>()
        user = mock<IUserAdaptor>()

        fetchUnreadFeeds = FetchUnreadFeeds({ feed, user })
    })

    describe('[service.readUnreadFeeds({ loginUseruid }) =>]', () => {
        beforeAll(() => {
            user.findUserFeedInfo.mockImplementation(async (_: string) => {
                return await new Promise(res => setTimeout(res, 0, ({ feeds: [], cursor: 0 })))
            })
        })

        it(['feedDB.fetchUnreadFeeds({ loginUserUid }) => ',
            'user.findUserFeedInfo() ',
            'user.findFeedsByList() ',
            'user.saveUserCursor() ',
        ].join(''), async () => {

            await fetchUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
            expect(user.findUserFeedInfo).toBeCalledTimes(1)
            expect(feed.findFeedsByList).toBeCalledTimes(1)
            expect(user.saveUserCursor).toBeCalledTimes(1)
        })
    })

    describe('[case1: feedlist.length < batchSize ] [service.readUnreadFeeds({ loginUseruid }) =>]', () => {
        beforeAll(() => {
            user.findUserFeedInfo.mockImplementation(async (_: string) => {
                return await new Promise(res => setTimeout(res, 0, ({ feeds: ["b777", "d49b"], cursor: 0 })))
            })
        })

        it(['feedDB.fetchUnreadFeeds({ loginUserUid }) => ',
            'user.findUserFeedInfo() ',
            'user.findFeedsByList() ',
            'user.findUserFeedInfo() '].join(''), async () => {
                await fetchUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
                expect(user.findUserFeedInfo).toBeCalledWith('4fae')
                expect(feed.findFeedsByList).toBeCalledWith(["b777", "d49b"])
                expect(user.saveUserCursor).toBeCalledWith('4fae', 2)
            })
    })

    describe('[case2: feedlist.length >= batchSize ] [service.readUnreadFeeds({ loginUseruid }) =>]', () => {
        beforeAll(() => {
            user.findUserFeedInfo.mockImplementation(async (_: string) => {
                return await new Promise(res => setTimeout(res, 0, ({ feeds: ["b777", "d49b", "4g09"], cursor: 0 })))
            })
        })

        it(['feedDB.fetchUnreadFeeds({ loginUserUid }) => ',
            'user.findUserFeedInfo() ',
            'user.findFeedsByList() ',
            'user.findUserFeedInfo() '].join(''), async () => {
                await fetchUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
                expect(user.findUserFeedInfo).toBeCalledWith('4fae')
                expect(feed.findFeedsByList).toBeCalledWith(["b777", "d49b", "4g09"])
                expect(user.saveUserCursor).toBeCalledWith('4fae', 3)
            })
    })
})