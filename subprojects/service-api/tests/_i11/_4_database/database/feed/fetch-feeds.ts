import { Feed } from '@feed/database'
import { FetchFeeds } from '@feed/database/typeorm/database/feed/impl'
import { feedTestAdaptorsProvider } from '@tests/helpers/adaptors'
// import { seedFeed } from '@tests/settings/feed'
// import { updateUserFeeds } from '@tests/settings/feed/updating.user'
import { Connection, getConnection } from 'typeorm'


describe('Feed Database', () => {
    let conn: Connection

    let fetchFeeds: ({ writerUid }: { writerUid: string; }) => Promise<Feed[]>

    beforeAll(() => {
        conn = getConnection()
        fetchFeeds = FetchFeeds(feedTestAdaptorsProvider(conn))
        // await updateUserFeeds(conn)
        // await seedFeed(conn)
    })

    describe('[service.readFeeds({ writerUid }) =>]', () => {

        it('feedDB.fetchFeeds({ writerUid }) <= user.findFeedsByList(writerUid)', async () => {
            const result = await fetchFeeds({ writerUid: '4fae'})
            expect(result.length).toEqual(3)
        })
    })

    // ⬆︎⬆︎⬆︎  -----      to be implemented       -----︎ ︎︎︎︎︎⬆︎︎︎︎⬆︎⬆︎︎︎︎
    //
    // -- working on the next feature //  todo() | in_progress (︎︎) | done(✔)
    //
    /*
        memo:
    */
    //
    // --
    //
    /*
        backlogs:
    */
    // ⬇︎⬇︎⬇  ----- ︎implemented codes down below -----︎︎ ⬇︎⬇︎⬇
    

})