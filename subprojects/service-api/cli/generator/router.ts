// import { Processor } from '../../config/processor/index'
// import { SeedGenerator } from '../../config/generator/index'
// import { Loader } from '../../config/loader'
// import { Comments } from '../../src/server/entities/comments';

import { Feed } from '../../src/data/database/typeorm/entities/feed/feed-aggregate'
import { SeedGenerator } from '../../config/data/generator/index'
import { SaveToPath } from '../../config/data/loader/save-to-path'
import Loader from '../../config/data/loader'
import { uuidv4 } from '@macroserviced/utils'
import { LoadFromPath } from '@config/data/loader/load-from-path2'
import { userTable } from '../../config/data/router/user-table'
import { EUserUid } from '@config/data/typings'
import { User } from '@cli/entities'

const { genSeeds } = SeedGenerator()

export const router: { [name: string]: any } = {
  // user: async() => { 
  //   const userSeeds = await genSeeds('https://jsonplaceholder.typicode.com/users')
  //   SaveToPath('cli/seeds/tmp/users.json')(userSeeds)
  // },
  messages: async (user?: EUserUid) => {
    const commentsSeeds = await genSeeds('https://official-joke-api.appspot.com/random_ten')
    let selectedUser: User

    if (!user) {
      SaveToPath(`cli/seeds/feed/messages.json`)(commentsSeeds)
      console.log(`[cli/seeds/feed/messages.json] <= created`)
    } else {
      const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
      selectedUser = userSelectiveLoader_users(user)[0]
      SaveToPath(`cli/seeds/tmp/messages/${selectedUser.name.toLowerCase()}-messages.json`)(commentsSeeds)
      console.log(`[cli/seeds/tmp/messages/${selectedUser.name.toLowerCase()}-messages.json] <= created`)
    }
  },
  comments: (user: EUserUid) => {
    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const originalWriter = userSelectiveLoader_users(user)[0]

    const messages = LoadFromPath(`cli/seeds/tmp/messages/${originalWriter.name.toLowerCase()}-messages.json`)
    const getRandomN = () => Math.floor(Math.random() * 5)
    const now = new Date("2021-07-03T09:00:00+0000")
    const comments: Feed[] = messages.map((m: any) => {
      return {
        feedId: m.id,
        uuid: uuidv4().slice(0, 4),
        msg: `${m.setup as string} \n ${m.punchline as string}`,
        writerUid: '',
        parentUid: '',
        createdAt: new Date(now.getTime() - 60 * 24 * 3600 * getRandomN()),
        childrenlist: [],
        children: [],
      }
    })
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)(comments)
  },
  nestedComments: (user: EUserUid, friends: EUserUid[]) => {
    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const originalWriter = userSelectiveLoader_users(user)[0]
    const feeds: Feed[] = LoadFromPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)
    const list = createTreeList(user)(feeds)

    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-nestedComments.json`)(list[0])
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-nestedComments(p).json`)(list[1])

    const comments = traverseTreeList(user, friends)(list[0], feeds)
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)(comments)
  }
}

export const renderR = (list: any, stack: any[]) => {
  for (const e of list) {
    const keys = Object.keys(e)
    for (const k of keys) {
      stack.push(k)
      if (e[k].length == 0) {
        const target = [...stack]
        for (let i = target.length - 2; i >= 0; i--) {
          console.log(target[i], target[i + 1])
        }
      }
      renderR(e[k], stack)
      stack.pop()
    }
  }
}

// const render = (list: Comments[]) => {
//   const unvisited = [...list]
//   while(unvisited.length) {
//     const current = unvisited.pop()
//     console.log(current)
//     unvisited.push(...current!.children!) 
//   }
// }

const traverseTreeList = (user: EUserUid, friends: EUserUid[]) => (list: Feed[], pool: Feed[]) => {
  const stack = []
  const store: Feed[] = []

  stack.unshift(...list)
  while (stack.length) {
    const node: Feed = stack.shift()

    let parent: Feed
    if ((node.writerUid == "") && (node.parentUid !== "0")) {
      parent = pool.find(po => (po.uuid == node.parentUid))

      const idx = Math.floor(Math.random() * friends.length)
      if (parent.writerUid === user) {
        node.writerUid = friends[idx]
      } else {
        parent = pool.find(p => (p.uuid == node.parentUid))
        do {
          const idx = Math.floor(Math.random() * [user, friends].length)
          node.writerUid = [user, ...friends][idx]
        } while ((parent.writerUid == node.writerUid)) 
      }
    } 

    store.push({
      feedId: node.feedId,
      msg: node.msg,
      uuid: node.uuid,
      writerUid: node.writerUid,
      children: [],
      childrenlist: node.childrenlist,
      createdAt: node.createdAt,
      dislikers: node.dislikers,
      likers: node.likers,
      parentUid: node.parentUid
    })
    if (node.children.length > 0) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i]
        stack.unshift(child)
      }
    }
  }
  return store
}

const createTreeList = (user: EUserUid) => (list: Feed[]) => {
  const ro: any[] = [], ro2: any[] = []
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const pool = [...list], po2 = [...list].map(e => ({ [`${e.uuid}`]: [] }))
  let c: Feed, c2 = {}

  while (pool.length) {
    let p: Feed | undefined = undefined, p2 = undefined
    c = pool.pop(), c2 = po2.pop()
    const pv = Math.floor(Math.random() * 100)

    if (ro.length == 0 || pool.length == 0 || ((0 <= pv) && (pv <= 20))) {
      ro.push(c), c.parentUid = "0", c.writerUid = user, ro2.push(c2)
    } else {
      if ((20 < pv) && (pv <= 40)) {
        const idx = Math.floor(Math.random() * ro.length)
        p = ro[idx], p2 = ro2[idx]
      } else if ((40 < pv) && (pv < 100)) {
        const idx = Math.floor(Math.random() * pool.length)
        p = pool[idx], p2 = po2[idx]
      }
      p.children?.push(c)
      if (p.childrenlist == "") {
        p.childrenlist = []
      }
      (p.childrenlist as string[]).push(c.uuid)
      c.parentUid = p.uuid
      p2[Object.keys(p2)[0]].push(c2)
      }
    }
  return [ro, ro2]
}
