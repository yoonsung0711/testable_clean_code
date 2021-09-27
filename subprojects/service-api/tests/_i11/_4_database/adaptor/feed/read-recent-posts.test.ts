import { Feed } from '@feed/database'
import { createConnector } from '@tests/helpers/conn'
import { Connection, getConnection } from 'typeorm'

import { FindUserPostsList } from '@feed/database/typeorm/adaptor/user/impl/user-aggregate'
import { FindFeedsByList } from '@feed/database/typeorm/adaptor/feed/impl/find-feeds-by-list'
import { seedFeed } from '@settings/_feed'
import { updateUserPosts } from '@settings/_user/updating.user'

jest.setTimeout(5000)

describe('FeedDatabaseAdaptor', () => {
    let conn: Connection

    let findUserPostsList: (userUid: string) => Promise<string[]>
    let findFeedsByList: (feedlist: string[]) => Promise<Feed[]>

    beforeAll(async () => {
        conn = getConnection()

        findUserPostsList = FindUserPostsList(createConnector(conn))
        findFeedsByList = FindFeedsByList(createConnector(conn))

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

    describe('[feedDB.readRecentPosts({ userUid }) =>]', () => {

        it('user.findUserPostsList(userUid) <= ', async () => {
            const result = await findUserPostsList('4fae')
            expect(result.length).toEqual(2)
        })

        it('feed.findFeedsByList(feedlist[]) <= ', async () => {
            const result = await findFeedsByList(['6ee4', '013a'])
            expect(result.length).toEqual(2)
        })
    })
})
