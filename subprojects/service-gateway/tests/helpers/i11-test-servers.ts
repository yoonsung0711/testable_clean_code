import { authMiddleware } from '@gateway/middlewares'
import { createAuthTestRouter, createTestFeedRouter, createTestUserRouter } from './conn'
import { TestErrorLogger } from './errloger'
import { TestWebServer } from './server'
import { Connection } from 'typeorm'
import { Express } from 'express'

export const createAuthTestWebServer
    = (conn: Connection): Express => {
        return TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createAuthTestRouter(conn, authMiddleware))
            .init()
    }

export const createFeedTestWebServer
    = (conn: Connection): Express => {
        return TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createTestFeedRouter(conn, authMiddleware))
            .init()
    }

export const createUserTestWebServer
    = (conn: Connection): Express => {
        return TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createTestUserRouter(conn, authMiddleware))
            .init()
    }