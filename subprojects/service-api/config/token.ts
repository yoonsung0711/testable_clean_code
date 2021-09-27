import { default as env } from './env'

export interface ITokenConfig {
    secret: string,
    expiresIn: number,
}

const _token: ITokenConfig = {
    expiresIn: 60 * 60,
    secret: env.SECRET
}

export default _token