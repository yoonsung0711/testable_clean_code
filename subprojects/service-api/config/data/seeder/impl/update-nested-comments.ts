import { Feed } from '@feed/data/database'
import { Connection } from 'typeorm'
import { SaveToPath } from '../../loader/save-to-path'

export const UpdateNestedComments
  = (conn: Connection) => async (list: Feed[], name: string): Promise<string> => {
    const logs: string[] = []
    let unvisited: Feed[] = [...list]
    while (unvisited.length !== 0) {
      const current = unvisited.shift()
      unvisited = [...(current?.children ?? []), ...unvisited]
      delete current.children
      await conn
        .createQueryBuilder()
        .update(Feed)
        .set({
          feedId: current.feedId,
          uuid: current.uuid,
          msg: current.msg,
          writerUid: current.writerUid,
          childrenlist: current.childrenlist,
          parentUid: current.parentUid,
          createdAt: current.createdAt
        })
        .where("uuid = :uuid", { uuid: current.uuid })
        .execute()
      logs.push(`nested: ${current.uuid} has been attached to ${current.parentUid}`)
    }
    const comments = await conn
      .getRepository(Feed)
      .find({
        order: {
          createdAt: 'DESC'
        }
      })
    SaveToPath(`./cli/seeds/feed/${name.toLowerCase()}-comments.json`)(comments)
    return logs.join('\n')
  }
