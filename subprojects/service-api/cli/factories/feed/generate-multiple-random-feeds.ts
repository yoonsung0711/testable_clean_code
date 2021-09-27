import { Feed, User } from '@feed/data/database'
import { createFeed } from '@feed/data/database'
import { createRandomMsg } from './create-random-msg'
import { createRandomUser2 } from '@cli/factories/index'

export const GenerateMultipleRandomFeeds = (createRandomUser: () => User) => {
  return async function* (num: number): AsyncGenerator<Feed> {
    const stream = [...Array(num).keys()].map((_) => createRandomMsg())
    const feeds_pool: Feed[] = []
    for await (const msg of stream) {
      await new Promise((res) => setTimeout(res, 300))

      // let parent: Feed
      // if (feeds_pool.length > 0 && (Math.floor(Math.random() * 100) >= 33)) {
      //     parent = feeds_pool[Math.floor(Math.random() * feeds_pool.length)]
      // }

      const writer = createRandomUser()
      const feed = createFeed({
        msg: msg,
        writerUid: writer.uuid
        // ...{ parent: (parent ? parent : undefined) }
      })
      feeds_pool.push(feed)
      yield feed
    }
  }
}

export const generateMultipleRandomFeeds = GenerateMultipleRandomFeeds(() =>
  createRandomUser2('4fae'),
)
