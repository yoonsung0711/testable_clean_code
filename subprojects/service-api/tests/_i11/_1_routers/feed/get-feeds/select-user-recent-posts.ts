import request, { Request, Response } from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { default as config } from '@config/index'

import { tokenizer } from '@feed/services/auth/util'

import { updateUserPosts } from '@settings/_user/updating.user'
import { seedFeed } from '@settings/_feed'
import { createFeedTestWebServer } from '@tests/helpers/i11-test-servers'

describe('Feed Routers', () => {
    let conn: Connection

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