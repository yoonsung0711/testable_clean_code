import path from 'path'
import { User } from '@feed/database'
import { createUser } from '@feed/database/typeorm/entities/user/user-aggregate'
import { createUserCredential } from '@feed/database/typeorm/entities/user/user-credential'
import { UserCredential } from '@feed/database/typeorm/entities/user/user-credential'
import { parseJsonFromFile } from '@micro/utils'

export const createRandomUser
    = (uuid?: string, except?: boolean): User => {
        const credentialSeeds = parseJsonFromFile<UserCredential>(path.join(__dirname, '../seeds/user/credential.json'))
        const userSeeds = parseJsonFromFile<User>(path.join(__dirname, '../seeds/user/user.json'))
        if (!except) {
            if (uuid) {
                // const userDetail = createUserDetail(userDetailSeeds.find(user => user.uuid === uuid))
                const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === uuid))
                const _user = userSeeds.find(user => user.uuid === uuid)
                const user = createUser({ ..._user, credential: _userCredential })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            } else {
                const _user = userSeeds[Math.floor(Math.random() * 8)]
                const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === _user.uuid))
                const user = createUser({ ..._user, credential: _userCredential})
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            }
        } else {
            const exceptUserSeeds = userSeeds.filter(user => user.uuid !== uuid)
            const _user = exceptUserSeeds[Math.floor(Math.random() * 7)]
            const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === _user.uuid))
            const user = createUser({ ..._user, credential: _userCredential})
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return user
        }
    }

export const createRandomUser2
    = (uuid?: string, except?: boolean): User => {
        const credentialSeeds = parseJsonFromFile<UserCredential>(path.join(__dirname, '../seeds/user/credential.json'))
        const userSeeds = parseJsonFromFile<User>(path.join(__dirname, '../seeds/user/user.json'))
        if (!except) {
            if (uuid) {
                // const userDetail = createUserDetail(userDetailSeeds.find(user => user.uuid === uuid))
                // const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === uuid))
                const _user = userSeeds.find(user => user.uuid === uuid)
                const user = createUser({ ..._user, credential: undefined })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            } else {
                const _user = userSeeds[Math.floor(Math.random() * 8)]
                // const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === _user.uuid))
                const user = createUser({ ..._user, credential: undefined})
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            }
        } else {
            const exceptUserSeeds = userSeeds.filter(user => user.uuid !== uuid)
            const _user = exceptUserSeeds[Math.floor(Math.random() * 7)]
            // const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === _user.uuid))
            const user = createUser({ ..._user, credential: undefined })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return user
        }
    }


export const createUserWithId
    = (uuid: string, userId?: string): Partial<User> => {
        if (userId) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return { ...createRandomUser(uuid), userId }
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return { ...createRandomUser(uuid) }
        }
    }

export const createUserWithId2
    = (uuid: string, userId?: string): Partial<User> => {
        if (userId) {
            return { userId }
        } else {
            return { userId: createRandomUser(uuid).userId }
        }
    }
