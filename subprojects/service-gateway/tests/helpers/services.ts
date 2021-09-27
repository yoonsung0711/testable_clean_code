import { Connection } from 'typeorm'

import { IAuthService } from '@gateway/services'
import { AuthService } from '@gateway/services'

import { createAuthTestDatabase } from './database'

export const createAuthTestService = (conn: Connection): IAuthService => {
    const authDB = createAuthTestDatabase(conn)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return AuthService({ authDB })
}