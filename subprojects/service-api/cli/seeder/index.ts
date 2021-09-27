import { Command } from 'commander'
import figlet from 'figlet'

import { cliUserTable } from '@config/data/cli'
import { router } from './router'

figlet('Database Seeder', (err, data) => {
  console.log(data)
  console.log('\n\n')
})

const program = new Command()
program
  .option('-p, --path <type>', 'path')
  .option('-u, --user <type>', 'user')
  .option('-s, --seed <type>', 'seed')
program.parse(process.argv)

const options = program.opts()

const hasRouter = Object
  .keys(router)
  .includes(options.seed)

// const hasPath = ('path' in options) && (options.path !== '')

if (!hasRouter) {
  throw Error('can not handle')
}

if (!hasRouter) {
  throw Error('can not handle')
} else {
  let user: string, 
    path: string

  if (options.user) {
    user = options.user
    if (options.path) {
      router[options.seed](cliUserTable.get(user), path)
    } else {
      router[options.seed](cliUserTable.get(user))
    }
  } else {
    throw Error('user not specified')
  }
}
