import { Connection, getConnection } from 'typeorm'
import { Feed, IFeedDatabase } from '@feed/database'
import { createFeedTestDatabase } from '@tests/helpers/database'

import { ReadRecentPosts } from '@feed/services/feed/services'
import { seedFeed } from '@settings/_feed'
import { updateUserPosts } from '@settings/_user/updating.user'


describe('Feed Service', () => {
    let conn: Connection
    let feedDB: IFeedDatabase

    let readRecentPosts: ({ userUid }: { userUid: string; }) => Promise<Feed[]>

    beforeAll(async () => {
        conn = getConnection()
        feedDB = createFeedTestDatabase(conn)

        readRecentPosts = ReadRecentPosts(feedDB)

        await updateUserPosts(conn)([
            {
                "uuid": "4fae",
                "name": "Michael",
                "posts": ["6ee4", "013a"]
            }
        ])
        await seedFeed(conn)([
            {
                "feedId": "9af35b05",
                "uuid": "6ee4",
                "msg": "What did the beaver say to the tree?\nIt's been nice gnawing you.",
                "writer": {
                    "uuid": "4fae",
                }
            },
            {
                "feedId": "a9d2aa78",
                "uuid": "013a",
                "msg": "Why did the kid cross the playground?\nTo get to the other slide.",
                "writer": {
                    "uuid": "4fae",
                }
            }
        ])
    })

    describe('[controller.getFeeds() =>]', () => {
        describe(['FeedCommandType: LOGIN_USER_RECENT_POSTS',
                  'FeedCommandType: SELECT_USER_RECENT_POSTS'
        ].join(''), () => {
            it('service.readRecentPosts({ loginUserUid }) <= feedDB.fetchFeeds({ userUidd })', async () => {
                const result = await readRecentPosts({ userUid: '4fae' })
                expect(result.length).toEqual(2)
            })

            it('service.readRecentPosts({ loginUserUid }) <= feedDB.fetchFeeds(userUid)', async () => {
                const result = await readRecentPosts({ userUid: '4fae' })
                expect(new Set(result.map(f => f.writer.name)).size).toEqual(1)
            })
        })
    })
})
