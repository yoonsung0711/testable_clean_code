import { User } from "@feed/data/database"
import { Connection } from "typeorm"
import { EUserUid } from "../typings"
import { UpdateThreadedComment } from '@config/data/updater/impl/update-threaded-comment'

export const createThreadedComment = (list: string[]): any[] => {
  let i = 0
  const root = []
  let curr = {},
    parent = {}
  const pool = []
  while (i < list.length) {
    pool.push(curr)
    if (Math.floor(Math.random() * 100) >= 20) {
      parent = pool[Math.floor(Math.random() * pool.length)]
    }
    curr = { [`${list[i]}`]: [] }
    if (Object.keys(parent)[0] == undefined) {
      root.push(curr)
    } else {
      parent[Object.keys(parent)[0]].push(curr)
    }
    i++
  }
  return root
}


export const SelectiveLoadFromUserThreadedFeeds
  = (conn: Connection) => {
    const createThreadedCommentFromPool
      = (_pool: string[]) => (list: string[]): any[] => {
        let i = 0
        const root = []
        let curr = {},
          parent = {}
        const pool = _pool.map(p => ({ [`${p}`]: [] }))
        const h: number[] = [-1]
        let c = -1
        while (i < list.length) {
          if (Math.floor(Math.random() * 100) >= 5) {
            while (h.includes(c)) {
              c = Math.floor(Math.random() * pool.length)
            }
            h.push(c)
            parent = pool[c]
          }
          curr = { [`${list[i]}`]: [] }
          if (parent[Object.keys(parent)[0]] !== undefined) {
            parent[Object.keys(parent)[0]].push(curr)
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          const rootKeys = root.reduce((acc, curr) => { acc.push(...Object.keys(curr)); return acc }, [])
          const parentKey = Object.keys(parent)[0]
          if (!rootKeys.includes(parentKey)) {
            root.push(parent)
          }
          i++
        }
        return root
      }
    return async (userSelection: (EUserUid /* | EUserUid[]*/) /*| User['uuid'][] */): Promise<any[][]> => {
      const createPool = async (userSelection: EUserUid) => {
        const user = await conn.getRepository(User)
          .findOneOrFail({
            where: {
              uuid: userSelection
            }
          })
        const pools: string[] = (await Promise.all(user.leaders.map(async (leaderUid) => {
          return await conn.getRepository(User)
            .findOneOrFail({
              where: {
                uuid: leaderUid
              }
            })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        }))).reduce((acc, curr) => [...curr.posts, ...acc], [])
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return createThreadedCommentFromPool(pools)(user.posts)
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await createPool(userSelection)
      // }
    }
  }

export const SelectiveUpdateUserThreadedComments
  = (userListTable: Map<EUserUid, string>) => (conn: Connection) => async (userSelection: (EUserUid | EUserUid[])): Promise<string> => {
    const logs = []
    if (Array.isArray(userSelection)) {
      await Promise.all((userSelection as []).map(async (user) => {
        const results = await SelectiveLoadFromUserThreadedFeeds(conn)(user)
        logs.push(`replies: ${userListTable.get(user)} added random comments to feeds`)
        return await UpdateThreadedComment(conn)(results)
      }))

    } else {
      const results = await SelectiveLoadFromUserThreadedFeeds(conn)(userSelection)
      logs.push(`replies: ${userListTable.get(userSelection)} added random comments to feeds`)
      await UpdateThreadedComment(conn)(results)
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return logs.join('\n')
  }
// console.log(JSON.stringify(selectiveUserFeeds, undefined, 2))
// console.log(JSON.stringify(CreateThreadedCommentFromPool(['e56e', 'f688', '0ce4', 'ff8f', '12bd', 'aaaf', 'fd7u', 'sd0f', '8f2v'])(['21b1', 'c2d8', 'f39c', '3da1']), undefined, 2))