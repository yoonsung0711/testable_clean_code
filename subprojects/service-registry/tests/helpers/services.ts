import { Connection } from 'typeorm'

import { IAuthService } from '@registry/services'
import { AuthService } from '@registry/services'

import { createAuthTestDatabase } from './database'

export const createAuthTestService = (conn: Connection): IAuthService => {
    const authDB = createAuthTestDatabase(conn)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return AuthService({ authDB })
}