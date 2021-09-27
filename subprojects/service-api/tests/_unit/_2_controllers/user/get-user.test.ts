import { Request } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'
import { IUserService } from '@feed/services'

import { GetUsers } from '@feed/controllers/user/controllers'

describe('User Controller', () => {
    let mockService: MockProxy<IUserService>

    beforeAll(() => {
        mockService = mock<IUserService>()
    })

    describe('[GET: /users =>]', () => {
        it('controller.getUsers => service.fetchAll', async () => {
            const getUsers = GetUsers(mockService)
            const httpRequest: Partial<Request> = {}
            await getUsers(httpRequest as Request)
            expect(mockService.fetchAll).toHaveBeenCalledTimes(1)
        })

    })
})
