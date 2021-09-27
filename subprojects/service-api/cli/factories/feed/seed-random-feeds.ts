import { Connection } from 'typeorm'
import { Feed } from '@feed/data/database'
import { GenerateMultipleRandomFeeds, generateMultipleRandomFeeds } from './generate-multiple-random-feeds'
import { createRandomUser2 } from '../user/create-random-user'

export const seedRandomFeed
    = async (conn: Connection): Promise<string> => {
        const feedGenerator = generateMultipleRandomFeeds(1)
        for await (const feed of feedGenerator) {
            const _feed = await conn.getRepository(Feed).save(feed)
            return (`feed: ${_feed.writer.name} ${_feed.uuid} ${_feed.feedId}`)
        }
    }

export const seedRandomFeeds
    = (conn: Connection) => {
        return async (num: number): Promise<string[]> => {
            let logs: string[]
            const feedGenerator = generateMultipleRandomFeeds(num)
            for await (const feed of feedGenerator) {
                const _feed = await conn.getRepository(Feed).save(feed)
                logs.push(`feed: ${_feed.writer.name} ${_feed.uuid} ${_feed.feedId}`)
            }
            return logs
        }
    }

export const createRandomFeed
    = async (userUid?: string): Promise<Feed> => {
        const generateMultipleRandomFeeds
            = GenerateMultipleRandomFeeds(() => createRandomUser2(userUid))

        const feedGenerator = generateMultipleRandomFeeds(1)
        for await (const feed of feedGenerator) {
            return feed
        }
    }

export const createRandomFeeds
    = async (num: number, userUid?: string): Promise<Feed[]> => {
        const generateMultipleRandomFeeds
            = GenerateMultipleRandomFeeds(() => createRandomUser2(userUid))

        const feeds = []
        const feedGenerator = generateMultipleRandomFeeds(num)
        for await (const feed of feedGenerator) {
            feeds.push(feed)
        }
        return feeds as Feed[]
    }
