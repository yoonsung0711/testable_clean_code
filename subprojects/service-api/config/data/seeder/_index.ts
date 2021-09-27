// import { Connection } from 'typeorm'
// import { findAncestor } from 'typescript';
// import { Comments } from '../../src/server/entities/comments'
// import { SaveToPath } from '../processor/save-to-path';

// export const Seeder = (conn: Connection) => {
//   const seedComment = async (comment: Comments) => {
//     const saved = await conn.getRepository(Comments)
//       .save(comment)
//     return `comment: ${saved.id} has been saved`
//   }
//   const updateNestedComments = async(list: any): Promise<string> => {
//     const logs: string[] = []
//     let unvisited = [...list]
//     // let comments: any[] = []
//     while (unvisited.length !== 0) {
//       const current = unvisited.shift()
//       unvisited = [...(current!.children ?? []), ...unvisited]
//       delete current.children
//       await conn
//           .createQueryBuilder()
//           .update(Comments)
//           .set({
//             comment: current.comment,
//             comment_sender_name: current.comment_sender_name,
//             createdAt: current.createdAt,
//             parent_comment_id: current.parent_comment_id,
//           })
//           .where("id = :id", { id: current.id })
//           .execute()
//       logs.push(`nested: ${current.id} has been attached to ${current.parent_comment_id}`)
//     }
//     const comments = await conn
//       .getRepository(Comments)
//       .find({
//         order: {
//           createdAt: 'DESC'
//         }
//       })
//     SaveToPath('./cli/seeds/comments.json')(comments)
//     return logs.join('\n')
//   }
//   return { seedComment, updateNestedComments }
// }
