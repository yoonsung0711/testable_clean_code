import { Feed } from '@feed/data/database'

export const filterProp
    = (feed: Feed): Feed => {
        // const feed = await createRandomFeed(userUid)
        const _feed_without_writer = (() => {
            const unselect = ['writer']
            const filtered = Object.keys(feed)
                .filter(key => !unselect.includes(key))
                .reduce((obj, key) => {
                    obj[key] = feed[key]
                    return obj
                }, {})
            return filtered
        })()
        const _feed = Object.assign(_feed_without_writer, {
            writer: (() => {
                const select = ['uuid', 'name']
                const filtered = Object.keys(feed.writer)
                    .filter(key => select.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = (feed['writer'])[key]
                        return obj
                    }, {})
                return filtered
            })()
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return _feed as Feed
    }