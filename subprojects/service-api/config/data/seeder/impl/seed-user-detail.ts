import { Connection } from 'typeorm'
import { createUserDetail, IUserDetail, UserDetail } from '@feed/data/database'

export const SeedUserDetail
  = (conn: Connection) => {
    return async (userDetailSeeds: IUserDetail[]) => {
      return (await Promise.all(userDetailSeeds.map(async (_detail): Promise<string>=> {
        const saved = await conn.getRepository(UserDetail)
          .save(createUserDetail(_detail))
        return `user-detail: ${(_detail as any).name as string} ${saved.uuid} ${saved.userDetailId} is created`
      }))).join('\n')
    }
  }