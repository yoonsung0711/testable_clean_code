import path from 'path'
import { Feed } from '@gateway/database'
import { Connection } from 'typeorm'
import { IUserInstanceType } from './seeding.feed'
import { randomDateBeforeDate } from '@gateway/database/typeorm/entities/feed/feed-aggregate'
import { parseJsonFromFile } from '@micro/utils';

export const createFeedDateTimeUpdate_selected
    = (userUid: string): {
        feedId?: string
        uuid?: string
        createdAt?: Date
    }[] => {
        let feeds: Feed[]

        switch (userUid) {
            case IUserInstanceType.MICHAEL:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/michael-feed.json'))
                break

            case IUserInstanceType.JENNY:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/jenny-feed.json'))
                break

            case IUserInstanceType.TOM:
                feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/tom-feed.json'))
                break
        }
        return feeds.map(f => (
            {
                feedId: f.feedId,
                uuid: f.uuid,
                createdAt: randomDateBeforeDate(new Date(), 2),
            }
        ))
        .sort((a: { createdAt: Date }, b: { createdAt: Date }) => (Date.parse(a.createdAt as unknown as string) - Date.parse(b.createdAt as unknown as string)))
    }

export const updateFeedDateTime
    = (conn: Connection) => async (feedUpdates: {
        feedId?: string
        uuid?: string
        createdAt?: Date
    }[]): Promise<string> => {
        return (await Promise.all(feedUpdates.map(async (_feed) => {
            if (_feed.createdAt !== undefined) {
                await conn.createQueryBuilder()
                    .update(Feed)
                    .set({
                        createdAt: _feed.createdAt
                    })
                    .where('uuid = :uuid', { uuid: _feed.uuid })
                    .execute()
                return `feed: ${_feed.uuid} <= createdAt: ${_feed.createdAt.toLocaleString()}`
            }
        }))).filter(_ => _).join('\n')
    }
