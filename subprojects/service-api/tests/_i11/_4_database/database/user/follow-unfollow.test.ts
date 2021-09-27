import { Connection, getConnection } from 'typeorm'

import { User } from '@feed/database'
import { createUserTestAdaptor } from '@tests/helpers/adaptors'
import { ReadAll } from '@feed/database/typeorm/database/user/impl'
import { AddUserLeader } from '@feed/database/typeorm/database/user/impl'
import { RemoveUserLeader } from '@feed/database/typeorm/database/user/impl'

describe('User Database', () => {
    let conn: Connection

    let readAll: () => Promise<User[]>
    let addUserLeader: ({ follower, leader }: { follower: string; leader: string; }) => Promise<boolean>
    let removeUserLeader: ({ follower, leader }: { follower: string; leader: string; }) => Promise<boolean>

    beforeAll(() => {
        conn = getConnection()

        readAll = ReadAll(createUserTestAdaptor(conn))
        addUserLeader = AddUserLeader({ user: createUserTestAdaptor(conn) })
        removeUserLeader = RemoveUserLeader({ user: createUserTestAdaptor(conn) })
    })

    describe('[service.followFriend({ loginUseruid, friendUid }) =>]', () => {
        it('userDB.addUserLeader({ follower, leader }) <= user.updateUserInfo(user)', async () => {
            const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' } })
            expect(before.followers).toEqual([])

            const result = await addUserLeader({ follower: '9f9e', leader: 'be67' })
            expect(result).toEqual(true)

            const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' } })
            expect(after.followers).toEqual(["9f9e"])
        })
    })

    describe('[service.unfollowFriend({ loginUseruid, friendUid }) =>]', () => {
        beforeAll(async () => {
            const user = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' } })
            user.followers = ['9f9e']
        })

        it('userDB.removeUserLeader({ follower, leader }) <= user.updateUserInfo(user)', async () => {
            const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' } })
            expect(before.followers).toEqual(["9f9e"])

            const result = await removeUserLeader({ follower: '9f9e', leader: 'be67' })
            expect(result).toEqual(true)

            const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' } })
            expect(after.followers).toEqual([])
        })
    })

    describe('[service.fetchAll() =>]', () => {
        it('userDB.readAll', async () => {
            const result = await readAll()
            expect(result.length).toEqual(8)
        })
    })
})