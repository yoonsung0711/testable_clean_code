import { createUserCredential, UserCredential } from '@gateway/database'
import { CreateUser, User } from '@gateway/database/typeorm/entities/user'
import { Connection } from 'typeorm'

export const seedUserCredential
    = (conn: Connection) => {
        return async (credentialSeeds: {
            userCredentialId: string,
            uuid: string,
            name?: string,
            password: string
        }[]): Promise<string> => {
            return (await Promise.all(credentialSeeds.map(async (_credential) => {
                await conn.getRepository(UserCredential)
                    .save(createUserCredential({ 
                        password: _credential.password,
                        uuid: _credential.uuid,
                        userCredentialId: _credential.userCredentialId
                    }))
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                return `user: ${_credential.name} ${_credential.uuid} ${_credential.userCredentialId} is created`
            }))).join('\n')
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
                const credential = await conn.getRepository(UserCredential).findOneOrFail({
                    where: {
                        uuid: _user.uuid
                    }
                })
                const createUser = CreateUser(conn)
                const user = await createUser({ ..._user, ...{ credential: credential } })
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