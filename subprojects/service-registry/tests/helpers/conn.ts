import { Router } from 'express'
import { createRegistryRouter } from '@registry/routers'

export const createTestRegistryRouter
    = (): Router => {
        // eslint-disable-next-line
        return createRegistryRouter()()
    }