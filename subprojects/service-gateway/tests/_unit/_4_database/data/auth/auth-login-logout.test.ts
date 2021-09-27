import { mock, MockProxy } from 'jest-mock-extended'
import { IUserCredentialAdaptor } from '@gateway/database'

import { ReadUserPass } from '@gateway/database/typeorm/database/auth/operations'

describe('User Database', () => {
    let userCredentialAdaptor: MockProxy<IUserCredentialAdaptor> | IUserCredentialAdaptor

    let readUserPass: (userUid: string) => Promise<unknown> 

    beforeAll(() => {
        userCredentialAdaptor = mock<IUserCredentialAdaptor>()
        readUserPass = ReadUserPass(userCredentialAdaptor)
    })

    describe('[POST: /auth/login, controller.login: service.getUserPass(userUid) =>] ', () => {
        it('userDB.readUserPass(userUid) => user.findUserCredential(UserUid)', async() => {
            await readUserPass('4fae')
            expect(userCredentialAdaptor.findUserCredential).toBeCalledTimes(1)
            expect(userCredentialAdaptor.findUserCredential).toHaveBeenCalledWith('4fae')
        })
    })
})