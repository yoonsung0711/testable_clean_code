import { default as database } from './database'
import { default as env } from './env'
import { default as cors_ } from './cors'
import { default as session } from './session'
import { default as token, ITokenConfig } from './token'
import { default as projects } from '../config/service'

import bunyan from 'bunyan'
import sess from 'express-session'
import cors from 'cors'

import { getLogger } from './logger'
import { ConnectionOptions } from 'typeorm'

export interface IConfig {
    server: {
        port: number,
        log: () => bunyan,
        cors_: cors.CorsOptions,
        session: sess.SessionOptions,
        token: ITokenConfig,
    },
    database: {
        dev: ConnectionOptions,
        prod: ConnectionOptions, 
        i11: ConnectionOptions, 
        e2e: ConnectionOptions, 
        seeder: ConnectionOptions, 
    },
    projects: {
        development: {
            name: any
            version: any
            registryUrl: string
            serviceTimeout: number
        };
        production: {
            name: any
            version: any
            registryUrl: string
            serviceTimeout: number
        };
        test: {
            name: any
            version: any
            registryUrl: string
            serviceTimeout: number
        }
    }
}

export default {
    server: {
        // secret: env.SECRET,
        port: env.PORT,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        log: () => getLogger('@micro/service-api', '1.0.0', 'debug'),
        cors_,
        session,
        token
    },
    database,
    projects,
}
