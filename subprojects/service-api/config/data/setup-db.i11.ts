import { Connection, createConnection, getConnection } from 'typeorm'
import { default as config } from '@config/index'
import { User, UserDetail } from '@feed/data/database'
import { EUserUid } from './typings'
import createSeeder from '@config/data/seeder'
import Loader from './loader'
import { userDetailTable, userTable } from './router'

let conn: Connection

beforeAll(async () => {
  // const t0 = Date.now()
  // const connectTime = Date.now()
  // const migrationTime = Date.now()

  conn = await createConnection(config.database.i11)
  const { ETHAN, JACKY, JENNY, MARK, MIA, MICHAEL, TOM } = EUserUid

  const entities = conn.entityMetadatas
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name)
    await repository.clear()
  }
  const { seedUser, seedUserDetail } = createSeeder(conn)

  const userSelectiveLoader_userDetails =
    Loader<UserDetail>().userSelectiveLoadFromTable(userDetailTable)
  const userSelectiveLoader_users =
    Loader<User>().userSelectiveLoadFromTable(userTable)

  await seedUserDetail(
    userSelectiveLoader_userDetails([
      MICHAEL,
      MIA,
      JENNY,
      JACKY,
      TOM,
      ETHAN,
      MARK,
    ]),
  ),
    await seedUser(
      userSelectiveLoader_users([MICHAEL, MIA, JENNY, JACKY, TOM, ETHAN, MARK]),
    )

  // console.log(
  //     ` 👩‍🔬 Connected in ${connectTime - t0}ms - Executed migrations in ${migrationTime - connectTime }ms.`
  // )
})
afterAll(async () => {
  await conn.close()
})
