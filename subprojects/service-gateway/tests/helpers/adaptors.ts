import { Connection } from 'typeorm'
import { createTypeormConnection } from '@gateway/database/typeorm/connection'

import { IUserCredentialAdaptor } from '@gateway/database'
import { UserCredentialAdaptor } from '@gateway/database'
import { createConnector } from './conn'

// import { UserCredentialDBAdaptor, UserDBAdaptor } from '@gateway/data'
// import { UserDetailDBAdaptor } from '@gateway/data'
// import { FeedDBAdaptor } from '@gateway/data'

// import { IUserDatabaseAdaptor } from '@gateway/data'
// import { IUserDetailDatabaseAdaptor } from '@gateway/data'
// import { IFeedDBAdaptors, IUserDBAdaptors } from '@gateway/typings'

// export const provideUserAdaptors
//     = (_conn: Connection): IUserDBAdaptors => {
//         const conn = createConnector(_conn)
//         return {
//             user: UserDBAdaptor(conn),
//             userDetail: UserDetailDBAdaptor(conn),
//             userCredential: UserCredentialDBAdaptor(conn),
//         }
//     }

export const createUserCredentialTestAdaptor
    = (conn: Connection): IUserCredentialAdaptor => {
        // eslint-disable-next-line
        return UserCredentialAdaptor(createTypeormConnection(conn))
    }
