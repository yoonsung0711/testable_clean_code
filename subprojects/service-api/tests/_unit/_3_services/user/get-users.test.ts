import { mock, MockProxy } from 'jest-mock-extended'
import { IUserDatabase } from '@feed/database'

import { FetchAll } from '@feed/services/user/services'

describe('User Services', () => {
    let mockUserDatabase: MockProxy<IUserDatabase>
    let fetchAll: () => Promise<unknown>

    beforeAll(() => {
        mockUserDatabase = mock<IUserDatabase>()
        fetchAll = FetchAll(mockUserDatabase)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('[controller.getUsers =>]', () => {

        it('service.fetchAll() => userDB.readAll()', async () => {
            await fetchAll()
            expect(mockUserDatabase.readAll).toBeCalled()
        })
    })
})