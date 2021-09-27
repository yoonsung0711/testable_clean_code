import { Connection, getConnection } from 'typeorm'

import { ReadUserPass } from '@gateway/database/typeorm/database/auth/operations'
import { User, UserCredential } from '@gateway/database'
import { createUserCredentialTestAdaptor } from '@tests/helpers/adaptors'

describe('Auth Database', () => {
    let conn: Connection
    
    let readUserPass: (userUid: string) => Promise<UserCredential>

    beforeAll(() => {
        conn = getConnection()

        readUserPass = ReadUserPass(createUserCredentialTestAdaptor(conn))
    })

    describe('[service.getUserPass() =>]', () => {
        it('userDB.readUserPass', async () => {
            const result = await readUserPass('4fae')
            expect(result).toEqual({
                "password": "$2b$10$ZAhWerqqVwG2baD1teyu2OBJVD5gwFHH6IMV9f5oJiFpU1Sut7Ioa",
                "userCredentialId": "1cebcfa7",
                "uuid": "4fae"
            })
        })
    })
})