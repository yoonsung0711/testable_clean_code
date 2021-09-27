import fs from 'fs'
import path from 'path'

const packageInfo = fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')

const { name, version } = JSON.parse(packageInfo)

export interface IRegistryConfig {
    development: {
      name: string 
      version: string 
      registryUrl: string
      serviceTimeout: number
    }
    production: {
      name: string 
      version: string 
      registryUrl: string
      serviceTimeout: number
    }
    test: {
      name: string 
      version: string 
      registryUrl: string
      serviceTimeout: number
    }
  }
  
const registryConfig: IRegistryConfig = {
    development: {
        name: name,
        version,
        registryUrl: 'http://service-registry:7000',
        serviceTimeout: 30
    },
    production: {
        name: name,
        version,
        registryUrl: 'http://service-registry:7000',
        serviceTimeout: 30
    },
    test: {
        name: name,
        version,
        registryUrl: 'http://service-registry:7000',
        serviceTimeout: 30
    }
}


export default registryConfig
