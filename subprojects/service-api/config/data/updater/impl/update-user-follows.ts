import { Connection } from "typeorm"
import { User } from '@feed/data/database'

export const UpdateUserFollows
  = (conn: Connection) => async (userFollowUpdates: Partial<User>[]): Promise<string> => {
    return (await Promise.all(userFollowUpdates.map(async (_user) => {
      if ((_user.followers.length > 0) || (_user.leaders.length > 0)) {
        await conn.createQueryBuilder()
          .update(User)
          .set({
            leaders: _user.leaders,
            followers: _user.followers,
          })
          .where('uuid = :uuid', { uuid: _user.uuid })
          .execute()
        return `user: ${_user.name} <= followers: ${JSON.stringify(_user.followers)}, leaders: ${JSON.stringify(_user.leaders)}`
      }
    }))).filter(_ => _).join('\n')
  }