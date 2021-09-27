import { mock, MockProxy } from 'jest-mock-extended'
import { IUserAdaptor } from '@feed/database'

import { ReadAll } from '@feed/database/typeorm/database/user/impl'

describe('User Database', () => {
    let userAdaptor: MockProxy<IUserAdaptor>
    let readAll: () => Promise<unknown>

    beforeAll(() => {
        userAdaptor = mock<IUserAdaptor>()
        readAll = ReadAll(userAdaptor)
    })


    describe('[service.fetchAll() =>] ', () => {
        it('userDB.readAll() => user.findAll()', async () => {
            await readAll()
            expect(userAdaptor.findAll).toBeCalledTimes(1)
        })
    })
})