import { Connection } from 'typeorm'
import { User, UserDetail } from "@feed/data/database"
import { createUser, IUser } from '@feed/data/database/typeorm/entities/user/user-aggregate'


export const SeedUser
  = (conn: Connection) => {
    return async (userSeeds: IUser[]): Promise<string> => {
      return (await Promise.all(userSeeds.map(async (_user) => {
        const detail = await conn.getRepository(UserDetail).findOneOrFail({
          where: {
            uuid: _user.uuid
          }
        })
        const user = createUser({ ..._user, ...{ userDetail: detail } })
        const saved = await conn.getRepository(User)
          .save(user)
        return `user: ${saved.name} ${saved.uuid} ${saved.userId} is created`
      }))).join('\n')
    }
  }

