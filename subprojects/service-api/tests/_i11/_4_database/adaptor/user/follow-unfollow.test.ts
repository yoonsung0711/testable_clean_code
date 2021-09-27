import { User } from '@feed/database'
import { createConnector } from '@tests/helpers/conn'
import { Connection, getConnection } from 'typeorm'

import { FindAll, UpdateUserInfo } from '@feed/database/typeorm/adaptor/user/impl/user-aggregate'

describe('UserDatabaseAdaptor', () => {
    let conn: Connection
    let findAll: () => Promise<User[]>
    let updateUserInfo: (user: User) => Promise<boolean>

    beforeAll(() => {
        conn = getConnection()
        findAll = FindAll(createConnector(conn))

        updateUserInfo = UpdateUserInfo(createConnector(conn))
    })

    describe(['[userDB.addUserFriend({ follower, leader }) =>]',
              '[userDB.removeUserFriend({ follower, leader }) =>]'].join('\n\t'), () => {

        describe('* update: followers', () => {
            it('user.updateUserInfo({ follower, leader }) <=', async () => {
                const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' }})
                expect(before.followers).toEqual([])

                before.followers = ['9f9e']
                await updateUserInfo(before)

                const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'be67' }}) 
                expect(after.followers).toEqual(["9f9e"])
            })
        })

        describe('* update: leaders', () => {
            it('user.updateUserInfo({ follower, leader }) <=', async () => {
                const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'a939' }})
                expect(before.leaders).toEqual([])

                before.leaders = ['9f9e']
                await updateUserInfo(before)

                const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'a939' }}) 
                expect(after.leaders).toEqual(["9f9e"])
            })
        })
    })

    describe('[userDB.fetchAll() =>]', () => {

        it('user.findAll() <= ', async () => {
            const result = await findAll()
            expect(result.length).toEqual(8)

        })
    })
})
