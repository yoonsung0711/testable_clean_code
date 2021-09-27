
import { userFollowsTable, userListTable, userPostsTable, userTable } from "@config/data/router"
import { EUserUid } from "@config/data/typings"
import { Feed, User } from "@feed/data/database"
import { parseJsonFromFile, stringifyJsonToFile } from '@macroserviced/utils';
import path from 'path'
import { CreateUserPostList } from "./create-user-post-list"
import { createThreadedComment } from '../../../config/data/helper/create-threaded-comment';

const createUserFeedList
  = ({ createUserPostList, userFollowsTable }: { createUserPostList: any, userFollowsTable: Map<EUserUid, Partial<User>> }) => {
    return (userSelection: EUserUid) => {
      const leaders = userFollowsTable.get(userSelection)['leaders']
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      // return leaders
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (leaders as []).reduce((acc, curr) => acc.concat(createUserPostList(curr)), [])
    }
  }

const { MICHAEL, ETHAN, JACKY, JAMES,JENNY, MARK, MIA, TOM } = EUserUid

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

const generateThreadedComment = (userSelection: EUserUid) => {
  const createUserPostList = CreateUserPostList(userPostsTable)
  const pool = createUserFeedList({ createUserPostList, userFollowsTable })(userSelection)
  const list = CreateUserPostList(userPostsTable)(userSelection)
  const obj = createThreadedCommentFromPool(pool)(list)
  stringifyJsonToFile(path.join(__dirname, '../../seeds/_updates/comments',`./${userListTable.get(userSelection).toLowerCase()}-comments.json`))(obj)
}

generateThreadedComment(MARK)