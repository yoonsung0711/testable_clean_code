import { mock, MockProxy } from 'jest-mock-extended'
import { IUserDatabase } from '@feed/database'

import { FollowFriend, UnfollowFriend } from '@feed/services/user/services'

describe('User Services', () => {
    let mockUserDatabase: MockProxy<IUserDatabase>
    
    let followFriend: ({ loginUserUid, friendUid }: { loginUserUid: string, friendUid: string }) => Promise<boolean>
    let unfollowFriend: ({ loginUserUid, friendUid }: { loginUserUid: string, friendUid: string }) => Promise<boolean>

    beforeAll(() => {
        mockUserDatabase = mock<IUserDatabase>()
        
        followFriend = FollowFriend(mockUserDatabase)
        unfollowFriend = UnfollowFriend(mockUserDatabase)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('[controller.putUser =>]', () => {

        it('service.followFriend({ loginUseruid, friendUid }) => userDB.addUserFriend({ follower, leader })', async () => {
            await followFriend({ loginUserUid: '9e9f', friendUid: '4fae' })
            expect(mockUserDatabase.addUserLeader).toHaveBeenCalled()
            expect(mockUserDatabase.addUserLeader).toHaveBeenCalledWith({ follower: '9e9f', leader: '4fae' })
        })

        it('service.unfollowFriend({ loginUseruid, friendUid }) => userDB.removeUserFriend({ follower, leader })', async () => {
            await unfollowFriend({ loginUserUid: '9e9f', friendUid: '4fae' })
            expect(mockUserDatabase.removeUserLeader).toHaveBeenCalled()
            expect(mockUserDatabase.removeUserLeader).toHaveBeenCalledWith({ follower: '9e9f', leader: '4fae' })
        })
    })
})