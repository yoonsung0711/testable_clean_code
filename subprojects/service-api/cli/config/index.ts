import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'sqlite',
  name: 'default',
  database: './data/prod.sqlite',
  entities: [
    // 'build/src/server/entities/*.js',
    'src/data/database/typeorm/entities/*.ts'
  ],
  logging: false,
  // dropSchema: true,
  synchronize: true
} 