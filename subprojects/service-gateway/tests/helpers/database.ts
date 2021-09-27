import { Connection } from 'typeorm'
import { createTypeormConnection } from '@gateway/database'

import { IAuthDatabase } from '@gateway/database'
import { AuthDatabase } from '@gateway/database'

export const createAuthTestDatabase
    = (conn: Connection): IAuthDatabase => {
        // eslint-disable-next-line
        return AuthDatabase(createTypeormConnection(conn))
    }
