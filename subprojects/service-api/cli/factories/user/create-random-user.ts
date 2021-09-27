import path from 'path'
import { User } from '@feed/data/database'
import { createUser } from '@feed/data/database/typeorm/entities/user/user-aggregate'
import { parseJsonFromFile } from '@macroserviced/utils'

export const createRandomUser
    = (uuid?: string, except?: boolean): User => {
        const userSeeds = parseJsonFromFile<User>(path.join(__dirname, '../../seeds/user/user.json'))
        if (!except) {
            if (uuid) {
                // const userDetail = createUserDetail(userDetailSeeds.find(user => user.uuid === uuid))
                const _user = userSeeds.find(user => user.uuid === uuid)
                const user = createUser({ ..._user })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            } else {
                const _user = userSeeds[Math.floor(Math.random() * 8)]
                const user = createUser({ ..._user })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            }
        } else {
            const exceptUserSeeds = userSeeds.filter(user => user.uuid !== uuid)
            const _user = exceptUserSeeds[Math.floor(Math.random() * 7)]
            const user = createUser({ ..._user })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return user
        }
    }

export const createRandomUser2
    = (uuid?: string, except?: boolean): User => {
        const userSeeds = parseJsonFromFile<User>(path.join(__dirname, '../../seeds/user/user.json'))
        if (!except) {
            if (uuid) {
                // const userDetail = createUserDetail(userDetailSeeds.find(user => user.uuid === uuid))
                // const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === uuid))
                const _user = userSeeds.find(user => user.uuid === uuid)
                const user = createUser({ ..._user })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            } else {
                const _user = userSeeds[Math.floor(Math.random() * 8)]
                // const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === _user.uuid))
                const user = createUser({ ..._user })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return user
            }
        } else {
            const exceptUserSeeds = userSeeds.filter(user => user.uuid !== uuid)
            const _user = exceptUserSeeds[Math.floor(Math.random() * 7)]
            // const _userCredential = createUserCredential(credentialSeeds.find(user => user.uuid === _user.uuid))
            const user = createUser({ ..._user })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return user
        }
    }
