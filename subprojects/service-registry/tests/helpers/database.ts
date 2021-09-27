import { Connection } from 'typeorm'
import { createTypeormConnection } from '@registry/database'

import { IUserDatabase } from '@registry/database'
import { IAuthDatabase } from '@registry/database'
import { IFeedDatabase } from '@registry/database'

import { UserDatabase } from '@registry/database'
import { AuthDatabase } from '@registry/database'
import { FeedDatabase } from '@registry/database'

export const createAuthTestDatabase
    = (conn: Connection): IAuthDatabase => {
        // eslint-disable-next-line
        return AuthDatabase(createTypeormConnection(conn))
    }

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
