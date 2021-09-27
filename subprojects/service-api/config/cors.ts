import cors from 'cors'
import { default as env } from './env'
const _cors: cors.CorsOptions = {
    origin: env.CORS_ORIGIN,
    credentials: true
}

export default _cors
