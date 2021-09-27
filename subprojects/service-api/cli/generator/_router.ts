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
import { userTable } from '../../config/data/router/user-table';
import { EUserUid } from '@config/data/typings'
import { User } from '@cli/entities'

const { genSeeds } = SeedGenerator()

export const router: { [name: string]: any } = {
  // user: async() => { 
  //   const userSeeds = await genSeeds('https://jsonplaceholder.typicode.com/users')
  //   SaveToPath('cli/seeds/tmp/users.json')(userSeeds)
  // },
  messages: async(user?: EUserUid) => { 
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
  comments: (user: EUserUid, friends: EUserUid[]) => { 
    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const originalWriter = userSelectiveLoader_users(user)[0]
    const commentWriters = userSelectiveLoader_users(friends)

    const messages = LoadFromPath(`cli/seeds/tmp/messages/${originalWriter.name.toLowerCase()}-messages.json`)
    const getRandomN = () => Math.floor(Math.random() * 5)
    const getRandomUser = () => [originalWriter, ...commentWriters][Math.floor(Math.random() * (commentWriters.length + 1))].uuid
    const now = new Date("2021-07-03T09:00:00+0000")
    const comments: Feed[] = messages.map((m: any, idx: number) => {
      return {
        feedId: m.id,
        uuid: uuidv4().slice(0, 4),
        msg: `${m.setup as string} \n ${m.punchline as string}`,
        writerUid: getRandomUser(),
        parentUid: '',
        createdAt: new Date(now.getTime() - 60 * 24 * 3600 * getRandomN()),
        childrenlist: [],
        children: [],
      } 
    })
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)(comments)
  },
  nestedComments: (user: EUserUid) => { 
    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const originalWriter = userSelectiveLoader_users(user)[0]
    const feeds: Feed[] = LoadFromPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)
    const root = createTree(feeds)
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)(root[0])
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-nestedComments.json`)(root[1])
    SaveToPath(`cli/seeds/feed/${originalWriter.name.toLowerCase()}-nestedComments(p).json`)(root[2])
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

const createTree = (list: Feed[]) => {
  const ro0: any[] = [], 
    ro1: any[] = [], 
    ro2: any[] = [] 
    
  const po0 = [...list], 
    po1 = [...list], 
    po2 = [...list].map(e => ({ [`${e.uuid}`]: [] }))

  let c0: Feed, 
    c1: Feed, 
    c2 = {}

  while (po0.length) {
    let p0: Feed | undefined = undefined, 
      p1: Feed | undefined = undefined, 
      p2 = undefined

    c0 = po0.pop()! 
    c1 = po1.pop()! 
    c2 = po2.pop()!

    if (Math.floor(Math.random() * 100) >= 50) {
      const idx = Math.floor(Math.random() * po0.length)
      p0 = po0[idx], p1 = po1[idx], p2 = po2[idx]
    } else {
      const idx = Math.floor(Math.random() * ro0.length)
      p0 = ro0[idx], p1 = ro1[idx], p2 = ro2[idx]
    }
    if (!p0) {
      ro0.push(c0), c0.parentUid = "0",
      ro1.push(c1), c1.parentUid = "0" 
      ro2.push(c2)
    } else {
      (p0.childrenlist == "") ? []: p0.childrenlist , (p0.childrenlist as string[]).push(c0.uuid), c0.parentUid = p0.uuid, 
      p1.children?.push(c1), (p1.childrenlist == "") ? []: p1.childrenlist , (p1.childrenlist as string[]).push(c1.uuid), c1.parentUid = p1.uuid, 
      p2[Object.keys(p2)[0]].push(c2) 
    }
  }
  return [ro0, ro1, ro2]
}