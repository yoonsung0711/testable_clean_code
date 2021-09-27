import { Connection } from 'typeorm'

import { IFeedService } from '@feed/services'
import { FeedService } from '@feed/services'

import { IUserService } from '@feed/services'
import { UserService } from '@feed/services'

import { createFeedTestDatabase } from './database'
import { createUserTestDatabase } from './database'

export const createFeedTestService = (conn: Connection): IFeedService => {
    const feedDB = createFeedTestDatabase(conn)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return FeedService(feedDB)
}

export const createUserTestService = (conn: Connection): IUserService => {
    const userDB = createUserTestDatabase(conn)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return UserService(userDB)
}
