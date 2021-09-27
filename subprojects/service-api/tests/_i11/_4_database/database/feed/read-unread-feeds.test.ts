import { Feed } from '@feed/database'
import { FetchUnreadFeeds } from '@feed/database/typeorm/database/feed/impl'
import { feedTestAdaptorsProvider } from '@tests/helpers/adaptors'
import { seedFeed } from '@settings/_feed'
import { updateUserFeeds } from '@settings/_user/updating.user'
import { Connection, getConnection } from 'typeorm'


describe('Feed Database', () => {
    let conn: Connection

    let fetchUnreadFeeds: ({ loginUserUid, batchSize }: { loginUserUid: string, batchSize: number }) => Promise<Feed[]>

    beforeAll(async () => {
        conn = getConnection()

        fetchUnreadFeeds = FetchUnreadFeeds(feedTestAdaptorsProvider(conn))

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

    describe('[service.readUnreadFeeds({ writerUid }) =>]', () => {

        it(['feedDB.fetchUnreadFeeds({ loginUserUid, batchSize }) <= '
            , 'user.findUserFeedInfo(userUid)'
            , 'user.saveUserCursor(userUid, cursor)'
            , 'feed.findFeedsByList(feedlist)'].join(''), async () => {

                const result = await fetchUnreadFeeds({ loginUserUid: '4fae', batchSize: 3 })
                expect(result.length).toEqual(2)
            })
    })
})