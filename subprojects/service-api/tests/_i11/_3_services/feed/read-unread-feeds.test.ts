import { Connection, getConnection } from 'typeorm'
import { Feed, IFeedDatabase } from '@feed/database'
import { createFeedTestDatabase } from '@tests/helpers/database'

import { ReadUnreadFeeds } from '@feed/services/feed/services'

import { seedFeed } from '@settings/_feed'
import { updateUserFeeds } from '@settings/_user/updating.user'


describe('Feed Service', () => {
    let conn: Connection
    let feedDB: IFeedDatabase

    let readUnreadFeeds: ({ loginUserUid, batchSize }: { loginUserUid: string, batchSize: number }) => Promise<Feed[]>

    beforeAll(async() => {
        conn = getConnection()
        feedDB = createFeedTestDatabase(conn)

        readUnreadFeeds = ReadUnreadFeeds(feedDB)

        await updateUserFeeds(conn)([
            {
                "uuid": "4fae",
                "name": "Michael",
                "feedCursor": 0,
                "feeds": ["e2d9", "b4e1"]
            },
        ])

        await seedFeed(conn)([
            {
                "feedId": "16bf22b0",
                "uuid": "e2d9",
                "dislikers": [],
                "likers": [],
                "msg": "Why did the mushroom get invited to the party?\nBecause he was a fungi.",
                "writer": {
                    "uuid": "a939",
                    "name": "Tom"
                }
            },
            {
                "feedId": "087917ed",
                "uuid": "b4e1",
                "dislikers": [],
                "likers": [],
                "msg": "When is a door not a door?\nWhen it's ajar.",
                "writer": {
                    "uuid": "a939",
                    "name": "Tom"
                }
            }
        ])
    })

    describe('[controller.getFeeds() =>]', () => {
        describe('FeedCommandType: LOGIN_USER_UNREAD_FEEDS', () => {
            it('service.readUnreadFeeds({ loginUserUid, batchSize }) <= feedDB.fetchFeeds({ userUidd })', async () => {
                const result = await readUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
                expect(result.length).toEqual(2)
            })

            it('service.readUnreadFeeds({ loginUserUid, batchSize }) <= feedDB.fetchFeeds(userUid)', async () => {
                const result = await readUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
                expect(new Set(result.map(f => f.writer.name)).size).toEqual(1)
            })
        })
    })
})
