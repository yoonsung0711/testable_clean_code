import { Connection, getConnection } from 'typeorm'
import { Feed, IFeedDatabase } from '@feed/database'
import { createFeedTestDatabase } from '@tests/helpers/database'

describe('Feed Service', () => {
    let conn: Connection
    let feedDB: IFeedDatabase


    beforeAll(() => {
        conn = getConnection()
        feedDB = createFeedTestDatabase(conn)
    })

    /*
        backlogs:

        import { LikeComment } from '@feed/services/feed/services'
        import { DislikeComment } from '@feed/services/feed/services'
        import { AddComment } from '@feed/services/feed/services'

        const likeComment = LikeComment(mockFeedDatabase)
        const dislikeComment = DislikeComment(mockFeedDatabase)
        const addComment = AddComment(mockFeedDatabase)

        it('service.likeComment() => feedDB.fetchFeed()', async() => {
            await likeComment()
            expect(mockFeedDatabase.fetchFeeds).toBeCalledTimes(1)
        })

        it('service.dislikeComment() => feedDB.fetchFeed()', async() => {
            await dislikeComment()
            expect(mockFeedDatabase.fetchFeeds).toBeCalledTimes(1)
        })

        it('service.addComment() => feedDB.fetchFeed()', async() => {
            await addComment()
            expect(mockFeedDatabase.fetchFeeds).toBeCalledTimes(1)
        })
    */

})
