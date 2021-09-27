import { Request } from 'express'
import { Connection, getConnection } from 'typeorm'

import { GetFeeds } from '@feed/controllers/feed/controllers'
import { createFeedTestService } from '@tests/helpers/services'
import { IHttpResponse } from '@feed/typings'

import { seedFeed } from '@settings/_feed'

import { updateUserPosts } from '@settings/_user/updating.user'


describe('Feed Controller', () => {
    let conn: Connection

    let getFeeds: (httpRequest: Partial<Request>) => Promise<IHttpResponse>

    beforeAll(async () => {
        conn = getConnection()

        await updateUserPosts(conn)([
            {
                "uuid": "9f9e",
                "name": "Jenny",
                "posts": ["2bf7", "2fa4"]
            }
        ])

        await seedFeed(conn)(jenny_posts)

        getFeeds = GetFeeds(createFeedTestService(conn))
    })

    describe('[GET: /feeds => ]', () => {

        describe('FeedCommandType: SELECT_USER_RECENT_POSTS', () => {
            it('returns feeds with status code 200 <= service.getFeeds({ logginUser })', async () => {
                const httpRequest: Partial<Request> = {
                    login_user_uid: '4fae',
                    query: {
                        target: 'select_user',
                        query: 'recent',
                        userUid: '9f9e',
                    }
                }
                const result = await getFeeds(httpRequest)
                expect(result.statusCode).toEqual(200)
                expect(result.body.length).toEqual(2)
            })
        })
    })
})

const jenny_posts = [
    {
        "feedId": "14b87a55",
        "uuid": "2bf7",
        "msg": "How come the stadium got hot after the game?\nBecause all of the fans left.",
        "writer": {
            "uuid": "9f9e",
        }
    },
    {
        "feedId": "252f1b08",
        "uuid": "2fa4",
        "msg": "What do you call two barracuda fish?\n A Pairacuda!",
        "writer": {
            "uuid": "9f9e",
        }
    },
]
