import { createConnector } from '@tests/helpers/conn'
import { Connection, getConnection } from 'typeorm'

import { Feed } from '@feed/database'
import { SaveUserCursor } from '@feed/database/typeorm/adaptor/user/impl/user-aggregate'
import { FindUserFeedList } from '@feed/database/typeorm/adaptor/user/impl/user-aggregate'
import { FindFeedsByList } from '@feed/database/typeorm/adaptor/feed/impl/find-feeds-by-list'
import { updateUserFeeds } from '@settings/_user/updating.user'
import { seedFeed } from '@settings/_feed'

jest.setTimeout(5000)

describe('FeedDatabaseAdaptor', () => {
    let conn: Connection

    let findUserFeedList: (userUid: string) => Promise<string[]>
    let findFeedsByList: (feedlist: string[]) => Promise<Feed[]>
    let saveUserCursor: (userUid: string, cursor: number) => Promise<any>    

    beforeAll(async() => {
        conn = getConnection()

        findUserFeedList = FindUserFeedList(createConnector(conn))
        findFeedsByList = FindFeedsByList(createConnector(conn))
        saveUserCursor = SaveUserCursor(createConnector(conn))

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

    describe('[feedDB.fetchUnreadFeeds({ writerUid }) =>]', () => {

        it('user.findUserFeedList(writerUid) <= ', async () => {
            const result = await findUserFeedList('4fae')
            expect(result.length).toEqual(2)
        })

        it('user.findFeedsByList(writerUid) <= ', async () => {
            const result = await findFeedsByList(["e2d9", "b4e1"])
            expect(result.length).toEqual(2)
        })

        it('user.saveUserCursor(writerUid) <= ', async () => {
            const result = await saveUserCursor('4fae', 2)
            expect(result).toEqual(2)
        })
    })
})
