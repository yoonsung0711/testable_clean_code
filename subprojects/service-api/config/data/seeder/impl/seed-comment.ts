import { Feed } from '@feed/data/database'
import { Connection } from 'typeorm'

export const SeedComment = (conn: Connection) => async (feed: Feed) => {
  const saved = await conn.getRepository(Feed)
    .save({
      ...feed,
      likers: [],
      dislikers: [],
    })
  return `comment: ${saved.uuid} has been saved`
}