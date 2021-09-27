import { mock, MockProxy } from 'jest-mock-extended'
import { IUserAdaptor } from '@feed/database'
import { RemoveUserLeader } from '@feed/database/typeorm/database/user/impl'
import { createUserWithId } from '@tests/helpers/entities'

describe('User Database', () => {
    let userAdaptor: MockProxy<IUserAdaptor>

    let removeUserLeader: ({ follower, leader }: { follower: string; leader: string; }) => Promise<boolean>

    beforeAll(() => {
        userAdaptor = mock<IUserAdaptor>()
    })

    describe('[service.unfollowFriend({ loginUseruid, friendUid }) =>] ', () => {
        afterEach(() => {
            jest.clearAllMocks()
        })
        beforeAll(() => {
            removeUserLeader = RemoveUserLeader({ user: userAdaptor })
            userAdaptor.findUserFeedInfo.mockImplementation(async (userUid: string) => {
                const user = createUserWithId(userUid)
                if (userUid === '9f9e') {
                    user.leaders = ['4fae']
                }
                if (userUid === '4fae') {
                    user.followers = ['9f9e']
                }
                return await new Promise(res => setTimeout(res, 0, user))
            })
        })
        it('userDB.removeUserLeader({ follower, leader }) => user.updateUserInfo(follower)', async () => {
            await removeUserLeader({ follower: '9f9e', leader: '4fae' })
            expect(userAdaptor.updateUserInfo.mock.calls[0][0]).toEqual({
                "credential": {
                    "password": "$2b$10$ZAhWerqqVwG2baD1teyu2OBJVD5gwFHH6IMV9f5oJiFpU1Sut7Ioa", "userCredentialId": "1cebcfa7", "uuid": "4fae"}, "feedCursor": 0, "feeds": [], "followers": [], "leaders": [], "name": "Michael", "posts": [], "userId": "b4125da5", "uuid": "4fae"})
        })
        it('userDB.removeUserLeader({ follower, leader }) => user.updateUserInfo(leader)', async () => {
            await removeUserLeader({ follower: '9f9e', leader: '4fae' })
            expect(userAdaptor.updateUserInfo.mock.calls[1][0]).toEqual({"credential": {"password": "$2b$10$CmwXUY952PZ8R5CxavZsbeRbHZ5gaRK02sQa.HuEO0ubQDFy2ucPK", "userCredentialId": "fd1f637c", "uuid": "9f9e"}, "feedCursor": 0, "feeds": [], "followers": [], "leaders": [], "name": "Jenny", "posts": [], "userId": "b41efe67", "uuid": "9f9e"})
        })
    })
})