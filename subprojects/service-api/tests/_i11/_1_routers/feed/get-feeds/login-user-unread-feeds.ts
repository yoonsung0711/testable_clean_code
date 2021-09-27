import request, { Request, Response } from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { default as config } from '@config/index'

import { tokenizer } from '@feed/services/auth/util'

import { updateUserFeeds } from '@settings/_user/updating.user'
import { seedFeed } from '@settings/_feed'
import { createFeedTestWebServer } from '@tests/helpers/i11-test-servers'

describe('Feed Routers', () => {
    let conn: Connection

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
    })

    describe('[feature: feed-fetching =>]', () => {

        describe('FeedCommandType: LOGIN_USER_UNREAD_FEEDS', () => {
            it('GET: /feeds <= controller.getFeeds', (done) => {
                const { token } = tokenizer.sign({ userUid: '4fae' }, config.server.token.secret, { expiresIn: 3600 })
                const app = createFeedTestWebServer(conn)

                void request(app)
                    .get('/feeds')
                    .set('Cookie', [`Authorization=${token}`])
                    .query({
                        batchSize: '3',
                        target: 'login_user',
                        query: 'unread',
                    })
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body.length).toEqual('')
                        done()
                    })
            })
        })
    })
})

const michael_unread_feeds = [
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