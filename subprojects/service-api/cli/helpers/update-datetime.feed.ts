import { Feed } from '@feed/data/database'
import { randomDateBeforeDate } from '@feed/data/database/typeorm/entities/feed/feed-aggregate'
import { parseJsonFromFile } from '@macroserviced/utils'
import { stringifyJsonToFile } from '@macroserviced/utils'



void (async () => {
    const feeds = parseJsonFromFile<Feed>('./james-feed.json')
    const _feeds = feeds
        .map(f => (f.createdAt === undefined)
            ? Object.assign(f, { createdAt: randomDateBeforeDate(new Date(), 2) }) 
            : f)
        .sort((a: Feed, b: Feed) => (Date.parse(a.createdAt as unknown as string) - Date.parse(b.createdAt as unknown as string)))
    stringifyJsonToFile<Feed>('./james-feed.json')(_feeds)

})()
