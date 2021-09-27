import { Connection, getConnection } from 'typeorm'
import { Feed, User } from '@feed/database'
import { FindUserProfileById } from '@feed/database/typeorm/adaptor/user/impl/user-detail'
import { CreateFeed } from '@feed/database/typeorm/entities/feed/feed-aggregate'

import { createConnector } from '@tests/helpers/conn'
import { Create } from '@feed/database/typeorm/adaptor/feed/impl/c-r-u-d'
import { createUserWithId2 } from '@cli/factories'


describe('FeedDatabaseAdaptor', () => {
    let conn: Connection

    let findUserProfileById: (userUid: string) => Promise<User>
    let create: (feed: Feed) => Promise<Feed>

    beforeAll(() => {
        conn = getConnection()

        findUserProfileById = FindUserProfileById(createConnector(conn))
        create = Create(createConnector(conn))
    })

    describe('[feedDB.pushFeed({ writerUid, msg}) =>]', () => {

        it('user.findUserInfo({ msg, writer }) <= ', async () => {
            const result = await findUserProfileById('4fae')
            expect(result).toEqual({
                "name": "Michael",
                "uuid": "4fae",
                "userDetail": {
                    "device": "Mobile",
                    "deviceIcon": "fa-mobile-alt",
                    "img": "avatar2"
                }
            })
        })

        it('feed.create({ msg, writer }) <= ', async () => {
            const writer = { ...createUserWithId2('4fae') } as User

            await create(CreateFeed(() => '7c1bbdec', () => 'dabf')({
                msg: 'this is feed i11 test',
                writer: writer
            }))

            const found = await conn.getRepository(Feed)
                .createQueryBuilder('feed')
                .leftJoinAndSelect('feed.writer', 'w')
                .select(['feed.msg'])
                .where('feed.uuid = :uuid', { uuid: 'dabf' })
                .addSelect(['w.name'])
                .getOneOrFail()

            expect(found).toEqual({
                "msg": "this is feed i11 test",
                "writer": {
                    "name": "Michael"
                }
            })
        })
    })

    describe('[userDB.readUserProfile(userUid) =>]', () => {

        it('user.findUserInfo(UserUid) => ', async () => {
            const result = await findUserProfileById('4fae')

            expect(result).toEqual({
                "name": "Michael",
                "userDetail": {
                    "device": "Mobile",
                    "deviceIcon": "fa-mobile-alt",
                    "img": "avatar2"
                },
                "uuid": "4fae"
            })
        })
    })
})
