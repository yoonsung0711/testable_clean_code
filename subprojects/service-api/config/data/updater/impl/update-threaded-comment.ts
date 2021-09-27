import Loader from "@config/data/loader"
import { userCommentsTable } from "@config/data/router/user-comments-table"
import { EUserUid } from "@config/data/typings"
import { Feed } from "@feed/data/database"
import { Connection } from "typeorm"

export const UpdateThreadedComment
  = (conn: Connection) => {
    const userSelectiveUpdateLoader_userComments = Loader().userSelectiveLoadFromTable(userCommentsTable)
    return (userTable: Map<EUserUid, string>) => {
      return async (userSelection: (EUserUid | EUserUid[])): Promise<string> => {
        const _update = async(list: any[]) => {
          const normalizing = (feed: Feed) => {
            return [feed].map((f) => ({
              ...f,
              ...{
                likers:
                  f.likers.length == 0
                    ? []
                    : !f.likers.includes(',')
                      ? [f.likers as string]
                      : (f.likers as string).split(','),
                dislikers:
                  f.dislikers.length == 0
                    ? []
                    : !f.dislikers.includes(',')
                      ? [f.dislikers as string]
                      : (f.dislikers as string).split(','),
              },
            }))[0]
          }
          const _updateThreadedComment = async (list: any[], stack: any[]) => {
            for (const e of list) {
              const keys = Object.keys(e)
              for (const k of keys) {
                stack.push(k)
                if (e[k].length == 0) {
                  const target = [...stack]
                  for (let i = target.length - 2; i >= 0; i--) {
                    const parent = normalizing(await conn
                      .getRepository(Feed).findOneOrFail({
                        where: {
                          uuid: target[i]
                        }
                      }))

                    await conn.getRepository(Feed).save(parent)
                  }
                }
                await _updateThreadedComment(e[k], stack)
                stack.pop()
              }
            }
          }
          await _updateThreadedComment(list, [])
        }

        if (Array.isArray(userSelection)) {
          await Promise.all((userSelection as []).map(_userUid => _update(userSelectiveUpdateLoader_userComments(userSelection))))
          return (userSelection as []).map(u => (`comment: ${userTable.get(u)} update thread`)).join('\n')
        } else {
          await _update(userSelectiveUpdateLoader_userComments(userSelection))
          return `comment: ${userTable.get(userSelection)} update thread`
        }
      }
    }
  }



// export const UpdateThreadedComment
//   = (conn: Connection) => {
//     const normalizing = (feed: Feed) => {
//       return [feed].map((f) => ({
//         ...f,
//         ...{
//           likers:
//             f.likers.length == 0
//               ? []
//               : !f.likers.includes(',')
//                 ? [f.likers as string]
//                 : (f.likers as string).split(','),
//           dislikers:
//             f.dislikers.length == 0
//               ? []
//               : !f.dislikers.includes(',')
//                 ? [f.dislikers as string]
//                 : (f.dislikers as string).split(','),
//           replies: f.replies == undefined ? [] : f.replies,
//         },
//       }))[0]
//     }
//     const _updateThreadedComment = async (list: any[], stack: any[]) => {
//       for (const e of list) {
//         const keys = Object.keys(e)
//         for (const k of keys) {
//           stack.push(k)
//           if (e[k].length == 0) {
//             const target = [...stack]
//             for (let i = target.length - 2; i >= 0; i--) {
//               const parent = normalizing(await conn
//                 .getRepository(Feed).findOneOrFail({
//                   where: {
//                     uuid: target[i]
//                   }
//                 }))

//               const child = normalizing(await conn.getRepository(Feed).findOneOrFail({
//                 where: {
//                   uuid: target[i + 1]
//                 }
//               }))
//               parent.replies = [...parent.replies, child]
//               await conn.getRepository(Feed).save(parent)
//             }
//           }
//           await _updateThreadedComment(e[k], stack)
//           stack.pop()
//         }
//       }
//     }
//     return (list: any[]) => _updateThreadedComment(list, [])
//   }
