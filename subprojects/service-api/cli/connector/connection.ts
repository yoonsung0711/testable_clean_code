import { createConnection, Connection, ConnectionOptions } from 'typeorm'

export interface IConnector {
  conn: Connection
  config: ConnectionOptions
  getConnection: () => Promise<Connection>
}

export class Connector {
  conn: Connection
  config: ConnectionOptions
  constructor(config: ConnectionOptions) {
    this.config = config
  }
  async getConnection() {
    if (!this.conn) {
      this.conn = await createConnection(this.config)
    }
    return this.conn
  }
}
