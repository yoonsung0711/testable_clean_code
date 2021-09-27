import { authMiddleware } from '@registry/middlewares'
import { createTestRegistryRouter } from './conn'
import { TestErrorLogger } from './errloger'
import { TestWebServer } from './server'
import { Connection } from 'typeorm'
import { Express } from 'express'

export const createRegistryTestWebServer
    = (conn: Connection): Express => {
        return TestWebServer
            .injectLogger(TestErrorLogger)
            .injectRouter(createTestRegistryRouter())
            .init()
    }
