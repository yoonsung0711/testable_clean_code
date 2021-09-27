import { IConfig } from 'config'
import TypeormConnector from '@feed/data/database/typeorm/connection'
import { createTypeormConnector, Feed, User, UserDetail } from '@feed/data/database'
import Loader from '@config/data/loader'
import createSeeder from '@config/data/seeder'
import createUpdater from '@config/data/updater'
import { EUserUid } from '@config/data/typings'
import { userPostsTable } from '@config/data/router'
import { userFollowsTable } from '@config/data/router'
import { userTable } from '@config/data/router'
import { userDetailTable } from '@config/data/router'
import { userListTable } from '@config/data/router'

export default async function conn(config: IConfig): Promise<TypeormConnector> {
    const _conn = createTypeormConnector(undefined, config.database.dev)
    const conn = await _conn.getConnection()

    const { ETHAN, JACKY, JENNY, MARK, MIA, MICHAEL, TOM, /*JAMES,*/ } = EUserUid

    const {
        seedFeed,
        seedUser,
        seedUserDetail,
    } = createSeeder(conn)

    const {
        updateUserFollows,
        updateUserPosts,
        updateUserFeeds,
        updateThreadedComment,
    } = createUpdater(conn)

    const userSelectiveLoader_userDetails = Loader<UserDetail>().userSelectiveLoadFromTable(userDetailTable)
    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const userSelectiveLoader_posts = Loader<Feed>().userSelectiveLoadFromTable(userPostsTable)
    const userSelectiveUpdateLoader_userFollows = Loader<User>().userSelectiveUpdatesLoadFromTable(userFollowsTable)

    const logs
        = ([
            '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎  seed user-detail  ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            await seedUserDetail(userSelectiveLoader_userDetails([
                MICHAEL,
                JENNY,
                TOM,
                MIA,
                JACKY,
                ETHAN,
                MARK,
            ])),
            '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎     seed user      ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            await seedUser(userSelectiveLoader_users([
                MICHAEL,
                JENNY,
                TOM,
                MIA,
                JACKY,
                ETHAN,
                MARK,
            ])),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎   update follows    ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            await updateUserFollows(userSelectiveUpdateLoader_userFollows([
                MICHAEL,
                JENNY,
                TOM,
                MIA,
                JACKY,
                ETHAN,
                MARK,
            ])),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎     seed posts      ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            await seedFeed(userSelectiveLoader_posts([
                MICHAEL,
                JENNY,
                TOM,
                MIA,
                JACKY,
                ETHAN,
                MARK
            ])),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎    update posts     ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            await updateUserPosts(userListTable)([
                MICHAEL,
                JENNY,
                TOM,
                MIA,
                JACKY,
                ETHAN,
                MARK
            ]),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎    update feeds     ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            await updateUserFeeds(userListTable)([
                MICHAEL,
                JENNY,
                TOM,
                MIA,
                JACKY,
                ETHAN,
                MARK
            ]),
            '◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎   update comments   ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
            // eslint-disable-next-line no-sparse-arrays
            // await updateThreadedComment(userListTable)([
            //     MICHAEL, 
            // ]),

            // eslint-disable-next-line no-sparse-arrays
        ].join('\n\n'))

    console.log(logs)
    return _conn
}