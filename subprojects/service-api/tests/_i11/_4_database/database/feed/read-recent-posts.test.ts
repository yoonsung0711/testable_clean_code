import { Feed } from '@feed/database'
import { FetchRecentPosts } from '@feed/database/typeorm/database/feed/impl'
import { feedTestAdaptorsProvider } from '@tests/helpers/adaptors'
import { seedFeed } from '@settings/_feed'
import { updateUserPosts } from '@settings/_user/updating.user'
import { Connection, getConnection } from 'typeorm'


describe('Feed Database', () => {
    let conn: Connection

    let fetchRecentPosts: ({ userUid }: { userUid: string }) => Promise<Feed[]>

    beforeAll(async () => {
        conn = getConnection()
        fetchRecentPosts = FetchRecentPosts(feedTestAdaptorsProvider(conn))

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

    describe('[service.readRecentPosts({ writerUid }) =>]', () => {

        it(['feedDB.fetchRecentPosts({ writerUid }) <=',
            'user.findFeedsByList(writerUid)',
            'user'
        ].join(''), async () => {
            const result = await fetchRecentPosts({ userUid: '4fae' })
            expect(result.length).toEqual(2)
        })
    })
})