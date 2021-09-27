import { Connection, getConnection } from 'typeorm'
import { User } from '@feed/database'
import { createUserTestDatabase } from '@tests/helpers/database'

import { FetchAll } from '@feed/services/user/services'
import { FollowFriend } from '@feed/services/user/services'
import { UnfollowFriend } from '@feed/services/user/services'

describe('UserService', () => {
    let conn: Connection

    let fetchAll: () => Promise<User[]>
    let followFriend: ({ loginUserUid, friendUid }: { loginUserUid: string; friendUid: string; }) => Promise<boolean>
    let unfollowFriend: ({ loginUserUid, friendUid }: { loginUserUid: string; friendUid: string; }) => Promise<boolean>

    beforeAll(() => {
        conn = getConnection()

        fetchAll = FetchAll(createUserTestDatabase(conn))
        followFriend = FollowFriend(createUserTestDatabase(conn))
        unfollowFriend = UnfollowFriend(createUserTestDatabase(conn))
    })

    describe('[controller.putUser =>]', () => {

        it('service.followFriend({ loginUseruid, friendUid }) <= userDB.addUserFriend({ follower, leader })', async () => {
            const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(before.followers).toEqual([])

            const result = await followFriend({ loginUserUid: '9f9e', friendUid: '4fae' })
            expect(result).toEqual(true)

            const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(after.followers).toEqual(["9f9e"])
        })
    })

    describe('[controller.putUser =>]', () => {

        beforeAll(async () => {
            const user = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' } })
            user.followers = ['9f9e']
        })

        it('service.unfollowFriend({ loginUseruid, friendUid }) <= userDB.addUserFriend({ follower, leader })', async () => {
            const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(before.followers).toEqual(["9f9e"])

            const result = await unfollowFriend({ loginUserUid: '9f9e', friendUid: '4fae' })
            expect(result).toEqual(true)

            const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(after.followers).toEqual([])
        })
    })

    describe('[controller.getUsers =>]', () => {

        it('service.fetchAll()', async () => {
            const result = await fetchAll()
            expect(result.length).toEqual(8)
        })
    })
})
