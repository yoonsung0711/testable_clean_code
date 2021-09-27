import { mock, MockProxy } from 'jest-mock-extended'
import { Request } from 'express'
import { IUserService } from '@feed/services'

import { PutUser } from '@feed/controllers/user/controllers'

describe('User Controller', () => {
    let mockService: MockProxy<IUserService>

    beforeAll(() => {
        mockService = mock<IUserService>()
    })

    describe('[PUT: /users/:userUid =>] IUserCommandType.FOLLOW_FRIEND', () => {
        it('controller.putUser => service.followFriend({ loginUseruid, friendUid })', async () => {
            const putUser = PutUser(mockService)
            const httpRequest: Partial<Request> = {
                body: {
                    login_user_uid: '9e9f',
                },
                query: {
                    subject: 'feed',
                    command: 'follow',
                },
                params: { userUid : '4fae'}
            }
            await putUser(httpRequest as Request)
            expect(mockService.followFriend).toHaveBeenCalledTimes(1)
        })

        it('controller.putUser => service.followFriend({ loginUseruid, friendUid })', async () => {
            const putUser = PutUser(mockService)
            const httpRequest: Partial<Request> = {
                body: {
                    login_user_uid: '9e9f',
                },
                query: {
                    subject: 'feed',
                    command: 'follow',
                },
                params: { userUid : '4fae'}
            }
            await putUser(httpRequest as Request)
            expect(mockService.followFriend).toHaveBeenCalledWith({"friendUid": "4fae", "loginUserUid": "9e9f"})
        })
    })
    
    describe('[PUT: /users/:userUid =>] IUserCommandType.UNFOLLOW_FRIEND', () => {
        it('controller.putUser => service.unfollowFriend({ loginUseruid, friendUid })', async () => {
            const putUser = PutUser(mockService)
            const httpRequest: Partial<Request> = {
                body: {
                    login_user_uid: '9e9f',
                },
                query: {
                    subject: 'feed',
                    command: 'unfollow',
                },
                params: { userUid : '4fae'}
            }
            await putUser(httpRequest as Request)
            expect(mockService.unfollowFriend).toHaveBeenCalledTimes(1)
        })

        it('controller.putUser => service.unfollowFriend({ loginUseruid, friendUid })', async () => {
            const putUser = PutUser(mockService)
            const httpRequest: Partial<Request> = {
                body: {
                    login_user_uid: '9e9f',
                },
                query: {
                    subject: 'feed',
                    command: 'unfollow',
                },
                params: { userUid : '4fae'}
            }
            await putUser(httpRequest as Request)
            expect(mockService.unfollowFriend).toHaveBeenCalledWith({ loginUserUid: '9e9f', friendUid: '4fae'})
        })
    })
})
