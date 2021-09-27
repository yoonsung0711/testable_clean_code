import { ConnectionOptions } from "typeorm"

export const prod: ConnectionOptions = {
    type: 'mysql',
    name: 'default',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    entities: [],
    logging: false,
    dropSchema: true,
    synchronize: true
}

export const dev: ConnectionOptions = {
    type: 'sqlite',
    name: 'default',
    database: `./bin/dev.sqlite`,
    entities: [
        'src/data/database/typeorm/entities/index.ts'
    ],
    logging: false,
    dropSchema: true,
    synchronize: true
}

export const i11: ConnectionOptions = {
    type: 'sqlite',
    name: 'default',
    database: `./tests/i11.sqlite`,
    entities: [
        'src/data/database/typeorm/entities/index.ts'
    ],
    logging: false,
    dropSchema: true,
    synchronize: true
}

export const e2e: ConnectionOptions = {
    type: 'sqlite',
    name: 'default',
    database: `./tests/e2e.sqlite`,
    entities: [
        'src/data/database/typeorm/entities/index.ts'
    ],
    logging: false,
    // dropSchema: true,
    // synchronize: true
}

export const seeder: ConnectionOptions = {
    type: 'sqlite',
    name: 'default',
    database: `./tests/seeder.sqlite`,
    entities: [
        'src/data/database/typeorm/entities/index.ts'
    ],
    logging: false,
    dropSchema: true,
    synchronize: true
}

export default {
    prod,
    dev,
    i11,
    e2e,
    seeder,
}