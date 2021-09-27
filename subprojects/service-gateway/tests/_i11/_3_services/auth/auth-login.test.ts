import { Connection, getConnection } from 'typeorm'
import { IAuthDatabase, User, UserCredential } from '@gateway/database'
import { createAuthTestDatabase } from '@tests/helpers/database'

import { GetUserPass } from '@gateway/services/auth/services'


describe('AuthService', () => {
    let conn: Connection
    let authDB: IAuthDatabase

    let getUserPass: (userUid: string) => Promise<UserCredential>

    beforeAll(() => {
        conn = getConnection()
        authDB = createAuthTestDatabase(conn)

        getUserPass = GetUserPass({ authDB })
    })

    describe('[controller.login =>]', () => {

        it('service.getUserPass(userUid)', async () => {
            const result = await getUserPass('4fae')
            expect(result).toEqual({
                "password": "$2b$10$ZAhWerqqVwG2baD1teyu2OBJVD5gwFHH6IMV9f5oJiFpU1Sut7Ioa",
                "userCredentialId": "1cebcfa7",
                "uuid": "4fae"
            })
        })
    })
})
