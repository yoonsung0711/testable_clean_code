import { Request } from 'express'
import { Connection, getConnection } from 'typeorm'

import { GetFeeds } from '@feed/controllers/feed/controllers'
import { createFeedTestService } from '@tests/helpers/services'
import { IHttpResponse } from '@feed/typings'

import { seedFeed } from '@settings/_feed'

import { updateUserFeeds } from '@settings/_user/updating.user'


describe('Feed Controller', () => {
    let conn: Connection

    let getFeeds: (httpRequest: Partial<Request>) => Promise<IHttpResponse>

    beforeAll(async () => {
        conn = getConnection()

        await updateUserFeeds(conn)([
            {
                "uuid": "4fae",
                "name": "Michael",
                "feedCursor": 0,
                "feeds": ["e2d9", "b4e1"]
            },
        ])
        await seedFeed(conn)(michael_unread_feeds)

        getFeeds = GetFeeds(createFeedTestService(conn))
    })

    describe('[GET: /feeds => ]', () => {
        describe('FeedCommandType: LOGIN_USER_UNREAD_FEEDS', () => {
            it('returns feeds with status code 200 <= service.getFeeds({ logginUser })', async () => {
                const httpRequest: Partial<Request> = {
                    login_user_uid: '4fae',
                    query: {
                        batchSize: '3',
                        target: 'login_user',
                        query: 'unread',
                    }
                }
                const result = await getFeeds(httpRequest)
                expect(result.statusCode).toEqual(200)
                expect(result.body.length).toEqual(2)
            })
        })

    })
})

const michael_unread_feeds =
    [
        {
            "feedId": "16bf22b0",
            "uuid": "e2d9",
            "dislikers": [],
            "likers": [],
            "msg": "Why did the mushroom get invited to the party?\nBecause he was a fungi.",
            "writer": {
                "uuid": "a939",
                "name": "Tom"
            }
        },
        {
            "feedId": "087917ed",
            "uuid": "b4e1",
            "dislikers": [],
            "likers": [],
            "msg": "When is a door not a door?\nWhen it's ajar.",
            "writer": {
                "uuid": "a939",
                "name": "Tom"
            }
        }
    ]