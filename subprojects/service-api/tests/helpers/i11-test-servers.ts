import { authMiddleware } from '@feed/middlewares'
import { createTestFeedRouter, createTestUserRouter } from './conn'
import { TestErrorLogger } from './errloger'
import { TestWebServer } from './server'
import { Connection } from 'typeorm'
import { Express } from 'express'


export const createFeedTestWebServer
    = (conn: Connection): Express => {
        return TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createTestFeedRouter(conn))
            .init()
    }

export const createUserTestWebServer
    = (conn: Connection): Express => {
        return TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createTestUserRouter(conn))
            .init()
    }