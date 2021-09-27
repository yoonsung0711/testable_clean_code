import { Connection, getConnection } from 'typeorm'

import { PushFeed } from '@feed/database/typeorm/database/feed/impl'
import { Feed } from '@feed/database'
import { feedTestAdaptorsProvider } from '@tests/helpers/adaptors'
import { CreateFeed } from '@feed/database/typeorm/entities/feed/feed-aggregate'
import { uid4digit } from '@micro/utils'

describe('Feed Database', () => {
    let conn: Connection
    let pushFeed: ({ writerUid, msg }: { writerUid: string, msg: string }) => Promise<string>

    beforeAll(() => {
        conn = getConnection()
    })

    describe('[service.publishFeed({ writerUid, msg }) =>]', () => {

        it(['feedDB.pushFeed({ writerUid, msg }) <= ',
            'user.findUserInfo(writerInfo), ',
            'feed.create(feed), ',
            'user.saveUserPost(writerUid, postUid })'
        ].join(''), async () => {
            const uuid = uid4digit()
            pushFeed = PushFeed(feedTestAdaptorsProvider(conn), CreateFeed(() => '7c1bbdec', () => uuid))
            await pushFeed({ writerUid: '4fae', msg: 'this message if for database opertation' })

            const found = await conn.getRepository(Feed)
                .createQueryBuilder('feed')
                .leftJoinAndSelect('feed.writer', 'w')
                .select(['feed.uuid', 'feed.msg', 'feed.writer'])
                .addSelect(['w.name'])
                .where('feed.uuid = :uuid', { uuid: uuid })
                .getOneOrFail()

            expect(found).toEqual({
                "msg": "this message if for database opertation",
                "uuid": uuid,
                "writer": {
                    "name": "Michael"
                }
            })
        })
    })
})