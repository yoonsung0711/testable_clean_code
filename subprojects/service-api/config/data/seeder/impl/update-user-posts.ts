import { Connection } from "typeorm"
import { Feed, User } from '@feed/data/database'
import { EUserUid } from '@config/data/typings'

export const UpdateUserPosts
  = (conn: Connection) => {
    return (userTable: Map<EUserUid, string>) => {
      return async (userSelection: (EUserUid| EUserUid[]) /*| User['uuid'][] */): Promise<string> => {
        const _updateUserPost = async(_userUid) : Promise<string> => {
          const user = await conn.getRepository(User)
            .findOneOrFail({
              where: {
                uuid: _userUid
              }
            })
            const posts = await conn.createQueryBuilder()
              .select(['f.uuid', 'f.writerUid'])
              .from(Feed, 'f')
              .where('f.writerUid = :uuid', { uuid: _userUid })
              .andWhere('f.parentUid = "0"')
              .getMany()
            const postList = posts.reduce((prev, curr) => {
              if (curr.parentUid == "0") {
                prev.push(curr.uuid)
              }
              return prev
            }, [] as string[])
            user.posts = [...postList]
            await conn.getRepository(User)
              .save(user)
            return `posts: ${userTable.get(_userUid)} has published ${posts.length} feeds`
        }
        if (Array.isArray(userSelection)) {
          return (await Promise.all((userSelection as []).map(_userUid => _updateUserPost(_userUid)))).join('\n')

        } else {
          return (await _updateUserPost(userSelection))
        }
      }
    }
  }