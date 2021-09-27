import { createFeed, Feed, User } from '@gateway/database'
import { Connection } from 'typeorm'
import path from 'path'
// import { readFeedsFromJson } from '../../cli/helpers/index';
import { parseJsonFromFile } from '@micro/utils'

export enum IUserInstanceType {
    JAMES = 'be67',
    MICHAEL = '4fae',
    JENNY = '9f9e',
    TOM = 'a939',
    JACKY = 'c097',
    MARK = '2e3f',
    ETHAN = '14ac',
    MIA = '3c07',
}

export const seedFeed_selected
    = (conn: Connection) => {
        return async (userUid: string): Promise<string> => {
            let feeds: Feed[]
            switch (userUid) {
                case IUserInstanceType.MICHAEL:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/michael-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.JENNY:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/jenny-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.TOM:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/tom-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.JACKY:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/jacky-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.MARK:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/mark-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.ETHAN:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/ethan-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.MIA:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/mia-feed.json'))
                    return await seedFeed(conn)(feeds)

                case IUserInstanceType.JAMES:
                    feeds = parseJsonFromFile<Feed>(path.join(__dirname, './seeds/james-feed.json'))
                    return await seedFeed(conn)(feeds)
            }
        }
    }

export const seedFeed
    = (conn: Connection) => {
        return async (feedSeeds: Partial<{
            feedId?: string
            uuid?: string
            writer: Partial<User>
            msg: string
            replies?: Feed[]
            parent?: Feed
            likers?: User['uuid'][]
            dislikers?: User['uuid'][]
            createdAt: Date
        }>[]): Promise<string> => {
            const logs = []
            
            const sortedSeeds = feedSeeds
                    .sort((a: { createdAt: Date }, b: { createdAt: Date }) => (Date.parse(a.createdAt as unknown as string) - Date.parse(b.createdAt as unknown as string)))

            for (const _feed of sortedSeeds) {
                const writer = await conn.getRepository(User)
                    .findOneOrFail({
                        where: {
                            uuid: _feed.writer.uuid
                        }
                    })

                // let parent: Feed | undefined
                // if (_feed.parent !== '') {
                //     parent = await conn.getRepository(Feed)
                //         .findOneOrFail({
                //             where: {
                //                 feedId: _feed.parent
                //             }
                //         })
                // }

                const saved = await conn.getRepository(Feed)
                    .save(createFeed({
                        feedId: _feed.feedId,
                        uuid: _feed.uuid,
                        msg: _feed.msg,
                        writer,
                        createdAt: _feed.createdAt,
                        // parent,
                        likers: [...(_feed.likers !== undefined ? _feed.likers : [])],
                        dislikers: [...(_feed.dislikers !== undefined ? _feed.dislikers : [])],
                    }))
                logs.push(`feed: ${saved.writer.name} ${saved.uuid} ${saved.feedId} is created at ( ${saved.createdAt.toLocaleString()} )`)
            }
            return logs.join(`\n`)
        }
    }
