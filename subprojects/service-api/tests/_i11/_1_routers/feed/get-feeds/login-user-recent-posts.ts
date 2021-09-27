import request, { Request, Response } from 'supertest'
import { Connection, getConnection } from 'typeorm'
import { default as config } from '@config/index'

import { seedFeed } from '@settings/_feed'
import { updateUserPosts } from '@settings/_user/updating.user'

import { createFeedTestWebServer } from '@tests/helpers/i11-test-servers'
import { tokenizer } from '@feed/services/auth/util'


describe('Feed Routers', () => {
    let conn: Connection

    beforeAll(async () => {
        conn = getConnection()

        await updateUserPosts(conn)([
            {
                "uuid": "4fae",
                "name": "Michael",
                "posts": ["6ee4", "013a"]
            }
        ])
        await seedFeed(conn)(michael_posts)
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

        describe('FeedCommandType: LOGIN_USER_RECENT_POSTS', () => {
            it('GET: /feeds <= controller.getFeeds', (done) => {
                const { token } = tokenizer.sign({ userUid: '4fae' }, config.server.token.secret, { expiresIn: 3600 })
                const app = createFeedTestWebServer(conn)

                void request(app)
                    .get('/feeds') // Mia
                    .set('Cookie', [`Authorization=${token}`])
                    .query({
                        target: 'login_user',
                        query: 'recent',
                    })
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body.length).toEqual(2)
                        done()
                    })
            })
        })

        describe('FeedCommandType: SELECT_USER_RECENT_POSTS', () => {
            it('GET: /feeds <= controller.getFeeds', (done) => {
                const { token } = tokenizer.sign({ userUid: '4fae' }, config.server.token.secret, { expiresIn: 3600 })
                const app = createFeedTestWebServer(conn)

                void request(app)
                    .get('/feeds') // 
                    .set('Cookie', [`Authorization=${token}`])
                    .query({
                        target: 'select_user',
                        query: 'recent',
                        userUid: '9f9e',
                    })
                    .end((_err: Request, _res: Response) => {
                        expect(_res.body.length).toEqual(2)
                        done()
                    })
            })
        })
    })
})

const michael_posts = [
    {
        "feedId": "9af35b05",
        "uuid": "6ee4",
        "msg": "What did the beaver say to the tree?\nIt's been nice gnawing you.",
        "writer": {
            "uuid": "4fae",
        }
    },
    {
        "feedId": "a9d2aa78",
        "uuid": "013a",
        "msg": "Why did the kid cross the playground?\nTo get to the other slide.",
        "writer": {
            "uuid": "4fae",
        }
    }
]
