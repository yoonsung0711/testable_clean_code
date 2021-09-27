import { UserCredential } from '@gateway/database'
import { FindUserCredential } from '@gateway/database/typeorm/adaptor/user/impl/user-credential'
import { createConnector } from '@tests/helpers/conn'
import { Connection, getConnection } from 'typeorm'

jest.setTimeout(5000)

describe('AuthDatabaseAdaptor', () => {
    let conn: Connection

    let findUserCredential: (userUid: string) => Promise<UserCredential>

    beforeAll(() => {
        conn = getConnection()

        findUserCredential = FindUserCredential(createConnector(conn))
    })

    describe('[userDB.readUserPass(userUid) =>]', () => {

        it('user.findUserCredential(userUid) => ', async () => {
            const result = await findUserCredential('4fae')
            expect(result).toEqual({
                "password": "$2b$10$ZAhWerqqVwG2baD1teyu2OBJVD5gwFHH6IMV9f5oJiFpU1Sut7Ioa",
                "userCredentialId": "1cebcfa7",
                "uuid": "4fae"
            })

        })
    })
})
