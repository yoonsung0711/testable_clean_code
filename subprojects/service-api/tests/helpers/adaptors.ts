import { Connection } from 'typeorm'
import { createTypeormConnection } from '@feed/database/typeorm/connection'

import { IUserAdaptor } from '@feed/database'
import { UserAdaptor } from '@feed/database'

import { IFeedAdaptor } from '@feed/database'
import { FeedAdaptor } from '@feed/database'

import { IFeedAdaptors } from '@feed/database/typeorm/adaptor'
import { createConnector } from './conn'

export const createUserTestAdaptor
    = (conn: Connection): IUserAdaptor => {
        // eslint-disable-next-line
        return UserAdaptor(createTypeormConnection(conn))
    }

export const createFeedTestAdaptor
    = (conn: Connection): IFeedAdaptor => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return FeedAdaptor(createTypeormConnection(conn))
    }

export const feedTestAdaptorsProvider
    = (_conn: Connection): IFeedAdaptors => {
        const conn = createConnector(_conn)
        return {
            feed: FeedAdaptor(conn),
            user: UserAdaptor(conn),
        }
    }
