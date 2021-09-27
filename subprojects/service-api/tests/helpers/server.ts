import express, { RequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import { ErrorRequestHandler } from 'express'

export const TestWebServer
    = (() => {
        let router: RequestHandler
        let handlers: RequestHandler[]
        let errlogger: ErrorRequestHandler

        const init = () => {
            const app = express()
            if (handlers) {
                for (const handler of handlers) {
                    app.use(handler)
                }
            }
            app.use(express.json())
            app.use(cookieParser())
            app.use(express.urlencoded({ extended: false }))
            app.use('/', router)
            app.use(errlogger)
            return app
        }

        const injectLogger
            = (_handler: ErrorRequestHandler) => {
                errlogger = _handler
                return { ...interfaces }
            }

        const injectHandlers
            = (_handlers: RequestHandler[]) => {
                handlers = _handlers
                return { ...interfaces }
            }

        const injectRouter
            = (_router: RequestHandler) => {
                router = _router
                return { ...interfaces }
            }

        const interfaces = { init, injectRouter, injectHandlers, injectLogger }

        return {
            ...interfaces
        }
    })()
