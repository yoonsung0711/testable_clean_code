import { default as env } from './env'
import path from 'path'
import session from 'express-session'
import sessionStore from 'session-file-store'

const FileStore = sessionStore(session)

const _session: session.SessionOptions = {
    secret: env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore({
        path: path.join(__dirname, '../../service-session'),
        reapInterval: 600,
    })
}

export default _session
