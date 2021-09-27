/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Connection, createConnection, getConnection } from 'typeorm'
import { default as config } from '@config/index'
import { seedUser, seedUserCredential } from './_user'
import { User, UserCredential } from '@gateway/database'
import path from 'path'
import { parseJsonFromFile } from '@micro/utils'

let conn: Connection

beforeAll(async () => {
    // const t0 = Date.now()
    // const connectTime = Date.now()
    // const migrationTime = Date.now()

    conn = await createConnection(config.database.i11)
    const entities = conn.entityMetadatas
    for (const entity of entities) {
        const repository = getConnection()
            .getRepository(entity.name)
        await repository.clear()
    }
    // console.log(path.join(__dirname, '../cli/seeds/user/credential.json'))
    // console.log(parseJsonFromFile<UserCredential>(path.join(__dirname, '../cli/seeds/user/credential.json')))
    await seedUserCredential(conn)(parseJsonFromFile<UserCredential>(path.join(__dirname, '../cli/seeds/user/credential.json')))
    // await seedUserDetail(conn)(parseJsonFromFile<UserDetail>(path.join(__dirname, '../cli/seeds/user/detail.json')))
    await seedUser(conn)(parseJsonFromFile<User>(path.join(__dirname, '../cli/seeds/user/user.json')))

    // console.log(
    //     ` 👩‍🔬 Connected in ${connectTime - t0}ms - Executed migrations in ${migrationTime - connectTime }ms.`
    // )
})
afterAll(async () => {
    await conn.close()
})
