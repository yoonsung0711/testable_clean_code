import { Request } from 'express'
import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { IFeedService } from '@feed/services'
import { PostFeed } from '@feed/controllers/feed/controllers'
import { GetFeeds } from '@feed/controllers/feed/controllers'

describe('Feed Controller', () => {
    let mockService: MockProxy<IFeedService>
    let postFeed: (httpRequest: Request) => Promise<any>
    let getFeeds: (httpRequest: Request) => Promise<any>

    beforeAll(() => {
        mockService = mock<IFeedService>()
        postFeed = PostFeed(mockService)
        getFeeds = GetFeeds(mockService)
    })

    describe('[GET: /feeds => ]', () => {

        describe('FeedCommandType: LOGIN_USER_UNREAD_FEEDS', () => {
            it('controller.getFeeds => service.readUnreadFeeds({ writerUid: login_user_uid })', async () => {
                const httpRequest: Partial<Request> = {
                    body: {
                        login_user_uid: '4fae',
                    },
                    query: {
                        batchSize: '3',
                        target: 'login_user',
                        query: 'unread',
                    }
                }
                await getFeeds(httpRequest as Request)
                expect(mockService.readUnreadFeeds).toHaveBeenCalledWith({ loginUserUid: '4fae', batchSize: 3 })
            })
        })

        describe('FeedCommandType: LOGIN_USER_RECENT_POSTS', () => {
            it('controller.getFeeds => service.readRecentPosts({ userUid: login_user_uid })', async () => {
                const httpRequest: Partial<Request> = {
                    body: {
                        login_user_uid: '4fae',
                    },
                    query: {
                        target: 'login_user',
                        query: 'recent',
                    }
                }
                await getFeeds(httpRequest as Request)
                expect(mockService.readRecentPosts).toHaveBeenCalledWith({ userUid: '4fae' })
            })
        })

        describe('FeedCommandType: SELECT_USER_RECENT_POSTS', () => {
            it('controller.getFeeds => service.readRecentPosts({ userUid: login_user_uid })', async () => {
                const httpRequest: Partial<Request> = {
                    query: {
                        target: 'select_user',
                        query: 'recent',
                        userUid: 'be67',
                    }
                }
                await getFeeds(httpRequest as Request)
                expect(mockService.readRecentPosts).toHaveBeenCalledWith({ userUid: 'be67' })
            })
        })
    })
})

