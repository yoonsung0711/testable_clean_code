import { Connection } from 'typeorm'
import { RequestHandler, Router } from 'express'
import TypeormConnection from '@gateway/database/typeorm/connection'
import { createAuthRouter } from '@gateway/routers'

export const createConnector
    = (conn?: Connection): TypeormConnection => {
        // eslint-disable-next-line
        return new TypeormConnection(conn)
    }

export const createAuthTestRouter
    = (conn: Connection, authMiddleware: RequestHandler): Router => {
        // eslint-disable-next-line
        return createAuthRouter(authMiddleware)(createConnector(conn))
    }