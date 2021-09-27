import { Feed } from '@feed/data/database'
import { filterProp } from '@cli/factories/feed/filter-prop'
import { createRandomFeeds } from '@cli/factories/feed/seed-random-feeds'
import { parseJsonFromFile, stringifyJsonToFile } from '@macroserviced/utils'
import { IUserInstanceType } from '@data/seeder/_feed/seeding.feed'

void (async () => {
    const { ETHAN, JACKY, JAMES, JENNY, MARK, MIA, MICHAEL, TOM } = IUserInstanceType
    const feeds = parseJsonFromFile<Feed>('./james-feed.json')
    const saveFeedsToJson = stringifyJsonToFile<Feed>('./james-feed.json')
    const newFeeds = (await createRandomFeeds(5, MIA)).map(filterProp)
    saveFeedsToJson(newFeeds, feeds)
})();
