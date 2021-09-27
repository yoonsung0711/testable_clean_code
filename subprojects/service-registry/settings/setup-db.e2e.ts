import { Connection } from 'typeorm'

let conn: Connection

beforeAll(() => {
    const t0 = Date.now();

    const connectTime = Date.now()
    const migrationTime = Date.now()

    console.log(
        ` 👩‍🔬 Connected in ${connectTime - t0}ms - Executed migrations in ${migrationTime - connectTime
        }ms.`
    )
})
afterAll(async () => {
    await conn.close()
})
