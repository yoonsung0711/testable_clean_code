import { Connection } from 'typeorm'
import { createTypeormConnection } from '@feed/database'

import { IUserDatabase } from '@feed/database'
import { IFeedDatabase } from '@feed/database'

import { UserDatabase } from '@feed/database'
import { FeedDatabase } from '@feed/database'

export const createUserTestDatabase
    = (conn: Connection): IUserDatabase => {
        // eslint-disable-next-line
        return UserDatabase(createTypeormConnection(conn))
    }

export const createFeedTestDatabase
    = (conn: Connection): IFeedDatabase => {
        // eslint-disable-next-line
        return FeedDatabase(createTypeormConnection(conn))
    }
