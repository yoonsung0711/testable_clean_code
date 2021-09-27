import request from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { tokenizer } from '@feed/services/auth/util'
import { default as config } from '@config/index'
import { User } from '@feed/database'
import { createUserTestWebServer } from '@tests/helpers/i11-test-servers'

describe('Feed Routers', () => {
    let conn: Connection

    beforeAll(() => {
        conn = getConnection()
    })

    describe('[feature: user-following =>]', () => {
        it('PUT: /users/:userUid <= controller.putUser', async() => {
            const { token } = tokenizer.sign({ userUid: '4fae' }, config.server.token.secret, { expiresIn: 3600 })

            const app = createUserTestWebServer(conn)
            
            const before = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(before.leaders.length).toEqual(0)

            const result = await request(app)
                .put('/users/a939') // Mia
                .set('Cookie', [`Authorization=${token}`])
                .query({
                    subject: 'feed',
                    command: 'follow'
                })
            expect(result.body).toEqual({ msg: 'updated' })

            const after = await conn.getRepository(User).findOneOrFail({ where: { uuid: '4fae' } })
            expect(after.leaders.length).toEqual(1)
        })
    })
})