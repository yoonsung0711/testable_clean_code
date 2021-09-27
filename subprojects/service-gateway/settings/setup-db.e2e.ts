import { Connection, createConnection } from 'typeorm'
import { default as config } from '@config/index'

let conn: Connection

beforeAll(async () => {
    const t0 = Date.now();
    conn = await createConnection(config.database.e2e);

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
