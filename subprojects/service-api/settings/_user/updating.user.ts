import path from 'path'
import { Feed, User } from '@feed/database'
import { Connection } from 'typeorm'
import { IUserInstanceType } from '../_feed/seeding.feed'
import { parseJsonFromFile } from '@micro/utils'

export const createPostsUpdate_selected
    = (userUid: string): {
        uuid: User['uuid'],
        name: User['name'],
        posts: User['posts']
    }[] => {
        let feeds: Feed[]
        let name: string
        switch (userUid) {
            case IUserInstanceType.MICHAEL:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/michael-feed.json'))
                name = 'Michael'
                break

            case IUserInstanceType.JENNY:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/jenny-feed.json'))
                name = 'Jenny'
                break

            case IUserInstanceType.TOM:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/tom-feed.json'))
                name = 'Tom'
                break

            case IUserInstanceType.MARK:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/mark-feed.json'))
                name = 'Tom'
                break

            case IUserInstanceType.MIA:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/mia-feed.json'))
                name = 'Tom'
                break
            case IUserInstanceType.ETHAN:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/ethan-feed.json'))
                name = 'Tom'
                break
            case IUserInstanceType.JACKY:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/jacky-feed.json'))
                name = 'Tom'
                break
            case IUserInstanceType.JAMES:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, '../_feed/seeds/james-feed.json'))
                name = 'Tom'
                break
        }
        return [{
            uuid: userUid,
            name: name,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            posts: feeds.map(f => f.uuid)
        }]
    }

export const updateUserFeeds
    = (conn: Connection) => async (userFeedUpdates: {
        uuid: User['uuid']
        name: User['name'],
        feeds: User['feeds'],
        feedCursor: User['feedCursor']
    }[]): Promise<string> => {
        return (await Promise.all(userFeedUpdates.map(async (_user) => {
            if (_user.feeds.length > 0) {
                await conn.createQueryBuilder()
                    .update(User)
                    .set({
                        feeds: [..._user.feeds],
                        feedCursor: _user.feedCursor
                    })
                    .where('uuid = :uuid', { uuid: _user.uuid })
                    .execute()
                await conn.getRepository(User).findOneOrFail({
                    where: {
                        uuid: _user.uuid
                    }
                })
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                return `user: ${_user.name} <= feeds: ${JSON.stringify(_user.feeds)}, cursor: ${_user.feedCursor}`
            }
        }))).filter(_ => _).join('\n')
    }

export const updateUserPosts
    = (conn: Connection) => async (userPostUpdates: {
        uuid: User['uuid'],
        name: User['name'],
        posts: User['posts']
    }[]): Promise<string> => {
        return (await Promise.all(userPostUpdates.map(async (_user) => {
            if (_user.posts.length > 0) {
                await conn.createQueryBuilder()
                    .update(User)
                    .set({
                        posts: _user.posts
                    })
                    .where('uuid = :uuid', { uuid: _user.uuid })
                    .execute()
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                return `user: ${_user.name} <= posts: ${JSON.stringify(_user.posts)}`
            }
        }))).filter(_ => _).join('\n')
    }


export const updateUserFollow
    = (conn: Connection) => async (userFollowUpdates: {
        uuid: User['uuid']
        name: User['name']
        leaders: User['leaders']
        followers: User['followers']
    }[]): Promise<string> => {
        return (await Promise.all(userFollowUpdates.map(async (_user) => {
            if ((_user.followers.length > 0) || (_user.leaders.length > 0)) {
                await conn.createQueryBuilder()
                    .update(User)
                    .set({
                        leaders: _user.leaders,
                        followers: _user.followers,
                    })
                    .where('uuid = :uuid', { uuid: _user.uuid })
                    .execute()
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                return `user: ${_user.name} <= followers: ${JSON.stringify(_user.followers)}, leaders: ${JSON.stringify(_user.leaders)}`
            }
        }))).filter(_ => _).join('\n')
    }