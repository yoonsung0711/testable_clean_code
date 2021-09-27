import { mock, MockProxy } from 'jest-mock-extended'
import { Feed, IFeedDatabase } from '@feed/database'

import { ReadUnreadFeeds } from '@feed/services/feed/services'
import { ReadRecentPosts } from '@feed/services/feed/services'

describe('Feed Services', () => {
    let mockFeedDatabase: MockProxy<IFeedDatabase> & IFeedDatabase
    
    let readUnreadFeeds: ({ loginUserUid, batchSize }: { loginUserUid: string; batchSize: number; }) => Promise<Feed[]>
    let readRecentPosts: ({ userUid }: { userUid: string }) => Promise<Feed[]>

    beforeAll(() => {
        mockFeedDatabase = mock<IFeedDatabase>()
        
        readUnreadFeeds = ReadUnreadFeeds(mockFeedDatabase)
        readRecentPosts = ReadRecentPosts(mockFeedDatabase)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('[GET: /feeds: controller.getFeeds =>]', () => {
        describe('FeedCommandType: LOGIN_USER_UNREAD_FEEDS', () => {
            it('service.readUnreadFeeds({ loginUserUid }) => feedDB.fetchUnreadFeeds({ loginUserUid })', async () => {
                await readUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
                expect(mockFeedDatabase.fetchUnreadFeeds).toBeCalledWith({ loginUserUid: '4fae', batchSize: 3 })
            })
        })
        describe( [ 'FeedCommandType: LOGIN_USER_RECENT_POSTS',
                    'FeedCommandType: SELECT_USER_RECENT_POSTS' ].join('\n\t') , () => {

            it('service.readRecentPosts({ userUid }) => feedDB.fetchRecentPosts({ userUid })', async () => {
                await readRecentPosts({ userUid: '4fae' })
                expect(mockFeedDatabase.fetchRecentPosts).toBeCalledWith({ userUid: '4fae' })
            })
        })
    })
})