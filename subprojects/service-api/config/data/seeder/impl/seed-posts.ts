import { Connection } from 'typeorm'
import { createFeed, Feed, User } from "@feed/data/database"
import { IFeed } from '@feed/data/database/typeorm/entities'


export const SeedFeed
	= (conn: Connection) => {
		return async (feedSeeds: Partial<IFeed>[]): Promise<string> => {
			const logs = []
			const parseDate = (createdAt) => Date.parse(createdAt)
			const sortedSeeds = feedSeeds
				.sort((a: { createdAt: Date }, b: { createdAt: Date }) => parseDate(a.createdAt) - parseDate(b.createdAt))

			for (const _feed of sortedSeeds) {
				const writer = await conn.getRepository(User)
					.findOneOrFail({
						where: {
							uuid: _feed.writerUid
						}
					})

				const saved = await conn.getRepository(Feed)
					.save(createFeed({
						feedId: _feed.feedId,
						uuid: _feed.uuid,
						msg: _feed.msg,
						writerUid: _feed.writerUid,
						parentUid: _feed.parentUid,
						createdAt: _feed.createdAt,
						childrenlist: _feed.childrenlist,
						likers: [...(_feed.likers !== undefined ? _feed.likers : [])],
						dislikers: [...(_feed.dislikers !== undefined ? _feed.dislikers : [])],
					}))
				logs.push(`posts: ${writer.name} ${saved.uuid} ${saved.feedId} is created at ( ${saved.createdAt.toLocaleString()} )`)
			}
			return logs.join(`\n`)
		}
	}
