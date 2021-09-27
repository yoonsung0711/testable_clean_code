import { Connector } from './connection'
import { ConnectionOptions } from 'typeorm'

export const createConnector = (config: ConnectionOptions) => {
  return new Connector(config)
}
