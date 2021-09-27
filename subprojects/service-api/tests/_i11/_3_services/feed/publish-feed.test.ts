import { Connection, getConnection } from 'typeorm'
import { Feed, IFeedDatabase, User } from '@feed/database'
import { createFeedTestDatabase } from '@tests/helpers/database'

import { PublishFeed } from '@feed/services/feed/services'

describe('Feed Service', () => {
    let conn: Connection
    let feedDB: IFeedDatabase

    let publishFeed: ({ msg, writerUid }: { msg: string, writerUid: string }) => Promise<User['uuid']>

    beforeAll(() => {
        conn = getConnection()
        feedDB = createFeedTestDatabase(conn)
        publishFeed = PublishFeed(feedDB)
    })

    describe('[controller.postFeed =>]', () => {

        it('service.publishFeed({ writerUid, msg }) [<= feedDB.pushFeed({ writerUid, msg})]', async () => {
            const feedUid = await publishFeed(
                { writerUid: '4fae', msg: 'this is feed service test' }
            )
            const found = await conn.getRepository(Feed).findOneOrFail({
                where: {
                    uuid: feedUid
                }
            })
            expect(found.msg).toEqual('this is feed service test')
        })
    })
})
