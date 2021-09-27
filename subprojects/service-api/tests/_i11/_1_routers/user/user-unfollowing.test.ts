import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { default as config } from '@config/index'
import { tokenizer } from '@feed/services/auth/util'
import { User } from '@feed/database'
import { createUserTestWebServer } from '@tests/helpers/i11-test-servers'

describe('Feed Routers', () => {
    let conn: Connection

    beforeAll(async() => {
        conn = getConnection()
        await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
    })

    describe('[feature: user-unfollowing =>]', () => {

        beforeAll(async () => {
            const follower = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            const leader = await conn.getRepository(User).findOneOrFail({ where: { uuid: 'a939' } })
            follower.leaders = ['a939']
            leader.followers = ['4fae']
            await conn.getRepository(User).save(follower)
            await conn.getRepository(User).save(leader)
        })

        it('GET: /users/:userUid <= controller.putUser', async() => {
            //follower
            const { token } = tokenizer.sign({ userUid: '4fae' }, config.server.token.secret, { expiresIn: 3600 })

            const app = createUserTestWebServer(conn)
            
            //follower
            const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(before.leaders.length).toEqual(1)

            const result = await request(app)
                .put('/users/a939') // 
                .set('Cookie', [`Authorization=${token}`])
                .query({
                    subject: 'feed',
                    command: 'unfollow'
                })
            expect(result.body).toEqual({ msg: 'updated' })

            const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(after.leaders.length).toEqual(0)
        })
    })
})