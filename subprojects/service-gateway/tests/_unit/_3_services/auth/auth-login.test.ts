import { mock, MockProxy } from 'jest-mock-extended'
import { IAuthDatabase, UserCredential } from '@gateway/database'

import { GetUserPass } from '@gateway/services/auth/services'

describe('User Services', () => {
    let mockAuthDatabase: MockProxy<IAuthDatabase>

    let getUserPass: (userUid: string) => Promise<UserCredential>

    beforeAll(() => {
        mockAuthDatabase = mock<IAuthDatabase>()

        getUserPass = GetUserPass({ authDB: mockAuthDatabase })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    
    describe('[POST: /auth/login: controller.login =>]', () => {

        it('service.getUserPass(userUid) => userDB.readUserPass(userUid)', async () => {
            await getUserPass('4fae')
            expect(mockAuthDatabase.readUserPass).toBeCalledWith('4fae')
        })
    })
})