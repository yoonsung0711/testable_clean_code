import dotenv from 'dotenv'
import { cleanEnv, str, num } from 'envalid'

dotenv.config({
    path: 'config/.env'
})

const env = cleanEnv(process.env, {
    SECRET: str(),
    PORT: num(),
    CORS_ORIGIN: str()
})

export default env