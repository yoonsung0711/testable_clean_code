import fs from 'fs'
import path from 'path'

const packageInfo = fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')

const { name, version } = JSON.parse(packageInfo)

const projects = {
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


export default projects
