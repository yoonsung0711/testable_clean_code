import { mock, MockProxy } from 'jest-mock-extended'
import { createFeed, IFeedAdaptor, IUserAdaptor, User } from '@feed/database'
import { CreateFeed } from '@feed/database/typeorm/entities/feed/feed-aggregate'

import { PushFeed } from '@feed/database/typeorm/database/feed/impl'

describe('Feed Database', () => {
    let feed: MockProxy<IFeedAdaptor>
    let user: MockProxy<IUserAdaptor>
    let pushFeed: ({ writerUid, msg }: { writerUid: string, msg: string }) => Promise<User['uuid']>

    beforeAll(() => {
        feed = mock<IFeedAdaptor>()
        user = mock<IUserAdaptor>()

        pushFeed = PushFeed({ feed, user }, createFeed)
    })

    describe('[service.publishFeed({ writerUid, msg }) => ]', () => {
        beforeAll(() => {
            feed.create.mockImplementation(async() => {
                return new Promise(res => setTimeout(res, 0, '7b8e'))
            })
        })

        it('feedDB.pushFeed({ writerUid, msg }) => user.findUserInfo(writerUid)', async () => {
            await pushFeed({ writerUid: '4fae', msg: 'this message if for database opertation' })
            expect(user.findUserId).toBeCalledTimes(1)
            expect(user.findUserId).toBeCalledWith('4fae')
        })

        it('feedDB.pushFeed({ writerUid, msg }) => feed.create({ msg, writer })', async () => {
            user.findUserId.mockImplementation(async () => {
                return new Promise(res => setTimeout(res, 0, 'b4125da5'))
            })
            const pushFeed = PushFeed({ feed, user }, CreateFeed(() => '01757681', () => 'b979'))
            await pushFeed({ writerUid: '4fae', msg: 'this message if for database opertation' })

            expect(feed.create).toBeCalledTimes(1)
            expect(feed.create).toBeCalledWith(expect.objectContaining({
                "dislikers": [], 
                "feedId": "01757681", 
                "likers": [], 
                "msg": "this message if for database opertation", 
                "uuid": "b979", 
                "writer": {
                    "credential": undefined, 
                    "feedCursor": undefined, 
                    "feeds": undefined, 
                    "followers": undefined, 
                    "leaders": undefined, 
                    "name": undefined, 
                    "posts": undefined, 
                    "userDetail": undefined, 
                    "userId": "b4125da5", 
                    "uuid": undefined
                }}))
        })
    })
})