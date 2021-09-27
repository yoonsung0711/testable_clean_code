import Loader from '@config/data/loader'
import { Feed, User } from '@feed/data/database'
import path from 'path'

import { createConnector } from '../connector/index'
import Seeder from '../../config/data/seeder/index'
import { LoadFromPath } from '@config/data/loader/load-from-path2'
import { EUserUid } from '@config/data/typings'
import { userTable } from '@config/data/router'

export const router: { [name: string]: any } = {
  // user: async (configPath?: string) => {
  // },
  comments: async (user: EUserUid, _path: string) => {
    const { config } = await import(path.join(__dirname, '../../', 'cli/config'))
    const connector = createConnector(config)
    const conn = await connector.getConnection()

    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const originalWriter = userSelectiveLoader_users(user)[0]

    const { seedComment } = Seeder(conn)
    const loadedSeeds = LoadFromPath(`./cli/seeds/feed/${originalWriter.name.toLowerCase()}-comments.json`)

    const logs = [
      '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎   seed  comments   ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
      (await Promise.all(loadedSeeds.map(async (s) => await seedComment(s)))).join('\n'),
    ].join('\n\n')

    console.log(logs)
  },
  nestedComments: async(user: EUserUid, _path: string) => {
    const { config }  = await import(path.join(__dirname, '../../', 'cli/config'))
    const connector = createConnector(config)
    const conn = await connector.getConnection()

    const { 
      updateNestedComments
    } = Seeder(conn)

    const userSelectiveLoader_users = Loader<User>().userSelectiveLoadFromTable(userTable)
    const originalWriter = userSelectiveLoader_users(user)[0]

    const loadedSeeds = LoadFromPath(`./cli/seeds/feed/${originalWriter.name.toLowerCase()}-nestedComments.json`)

    const logs = [
      '◼︎◼︎◼︎︎◼◼︎◼︎◼︎︎︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎︎    update nested   ◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎◼︎◼︎◼︎︎',
      await updateNestedComments(loadedSeeds as Feed[], originalWriter.name),
      ''
    ].join('\n\n')

    console.log(logs)
  }
}
