import { Command } from 'commander'
import figlet from 'figlet'
import { router } from './router'
import { cliUserTable } from '../../config/data/cli/index'

figlet('Seed Generator', (_, data) => {
  console.log(data)
  console.log('\n\n')
})

const program = new Command()
program
  .option('-g, --gen <type>', 'gen')
  .option('-u, --user <type>', 'user')
  .option('-f, --friends <friends...>', 'friend')
program.parse(process.argv)

const options = program.opts()

const hasRouter = Object
  .keys(router)
  .includes(options.gen)

if (!hasRouter) {
  throw Error('can not handle')
} else {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  let user: string, friends: string[]

  if (options.friends && options.user) {
    user = options.user
    friends = options.friends
    router[options.gen](cliUserTable.get(user), friends.map(f => cliUserTable.get(f)))
  } else {
    if (options.user) {
      user = options.user
      router[options.gen](cliUserTable.get(user))
    } else {
      router[options.gen]()
    }
  }

}

