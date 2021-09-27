import { createUserDetail, User, UserDetail, } from '@feed/database'
import { createUser } from '@feed/database/typeorm/entities/user/user-aggregate'
import { Connection } from 'typeorm'

export const seedUserDetail
    = (conn: Connection) => {
        return async (userDetailSeeds: {
            userDetailId: string,
            uuid: string,
            img: string,
            device: string,
            deviceIcon: string
        }[]): Promise<void> => {
            await Promise.all(userDetailSeeds.map(async (_detail) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return await conn.getRepository(UserDetail)
                    .save(createUserDetail(_detail))
            }))
        }
    }

export const seedUser
    = (conn: Connection) => {
        return async (userSeeds: {
            userId: string,
            uuid: string,
            name: string
        }[]): Promise<string> => {
            return (await Promise.all(userSeeds.map(async (_user) => {
                const detail = await conn.getRepository(UserDetail).findOneOrFail({
                    where: {
                        uuid: _user.uuid
                    }
                })
                const user = createUser({ ..._user, ...{ userDetail: detail } })
                const saved = await conn.getRepository(User)
                    .save(user)
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                return `user: ${saved.name} ${saved.uuid} ${saved.userId} is created`
            }))).join('\n')
        }
    }


// export const seedUserCredential
//     = async (conn: Connection): Promise<void> => {
//         await Promise.all(credentialSeeds.map(async (_credential) => {
//             return await conn.getRepository(UserCredential)
//                 .save(createUserCredential(_credential))
//         }))
//     }

// export const seedUserDetail
//     = async (conn: Connection): Promise<void> => {
//         await Promise.all(userDetailSeeds.map(async (_detail) => {
//             return await conn.getRepository(UserDetail)
//                 .save(createUserDetail(_detail))
//         }))
//     }

// export const seedUser
//     = async (conn: Connection): Promise<string> => {
//         return (await Promise.all(userSeeds.map(async (_user) => {
//             const detail = await conn.getRepository(UserDetail).findOneOrFail({
//                 where: {
//                     uuid: _user.uuid
//                 }
//             })
//             const credential = await conn.getRepository(UserCredential).findOneOrFail({
//                 where: {
//                     uuid: _user.uuid
//                 }
//             })
//             const createUser = CreateUser(conn)
//             const user = await createUser({ ..._user, ...{ credential: credential }, ...{ userDetail: detail } })
//             const saved = await conn.getRepository(User)
//                 .save(user)
//             return `user: ${saved.name} ${saved.uuid} ${saved.userId} is created`
//         }))).join('\n')
//     }