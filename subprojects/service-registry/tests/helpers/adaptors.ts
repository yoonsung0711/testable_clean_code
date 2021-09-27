import { Connection } from 'typeorm'
import { createTypeormConnection } from '@registry/database/typeorm/connection'

import { IUserAdaptor } from '@registry/database'
import { UserAdaptor } from '@registry/database'

import { IFeedAdaptor } from '@registry/database'
import { FeedAdaptor } from '@registry/database'

import { IUserCredentialAdaptor } from '@registry/database'
import { UserCredentialAdaptor } from '@registry/database'
import { IFeedAdaptors } from '@registry/database/typeorm/adaptor'
import { createConnector } from './conn'

// import { UserCredentialDBAdaptor, UserDBAdaptor } from '@registry/data'
// import { UserDetailDBAdaptor } from '@registry/data'
// import { FeedDBAdaptor } from '@registry/data'

// import { IUserDatabaseAdaptor } from '@registry/data'
// import { IUserDetailDatabaseAdaptor } from '@registry/data'
// import { IFeedDBAdaptors, IUserDBAdaptors } from '@registry/typings'

// export const provideUserAdaptors
//     = (_conn: Connection): IUserDBAdaptors => {
//         const conn = createConnector(_conn)
//         return {
//             user: UserDBAdaptor(conn),
//             userDetail: UserDetailDBAdaptor(conn),
//             userCredential: UserCredentialDBAdaptor(conn),
//         }
//     }

export const createUserTestAdaptor
    = (conn: Connection): IUserAdaptor => {
        // eslint-disable-next-line
        return UserAdaptor(createTypeormConnection(conn))
    }

export const createUserCredentialTestAdaptor
    = (conn: Connection): IUserCredentialAdaptor => {
        // eslint-disable-next-line
        return UserCredentialAdaptor(createTypeormConnection(conn))
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
