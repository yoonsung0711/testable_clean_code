import { Connection } from 'typeorm'
import { Router } from 'express'
import TypeormConnection from '@feed/database/typeorm/connection'
import { createFeedRouter } from '@feed/routers'
import { createUserRouter } from '@feed/routers'

export const createConnector
    = (conn?: Connection): TypeormConnection => {
        // eslint-disable-next-line
        return new TypeormConnection(conn)
    }

export const createTestFeedRouter
    = (conn: Connection): Router => {
        // eslint-disable-next-line
        return createFeedRouter()(createConnector(conn))
    }
export const createTestUserRouter
    = (conn: Connection): Router => {
        // eslint-disable-next-line
        return createUserRouter()(createConnector(conn))
    }
