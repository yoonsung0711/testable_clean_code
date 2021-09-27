import bunyan from 'bunyan'

export const getLogger
    = (serviceName: string, serviceVersion: string, level: string): bunyan => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level: (level == 'debug') ? 'debug' : (level == 'info') ? 'info' : 'fatal' })
    }