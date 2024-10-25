import { Express } from 'express'
import Session from 'express-session'
import MongoStore from 'connect-mongo'

import { config } from '../../config'

import type { UserSession } from '../../logic/types/common'

declare module 'express-session' {
    interface SessionData {
        user: UserSession
        cookie: Cookie
    }
}

export function createSession(app: Express) {
    app.set('trust proxy', 1)
    app.use(
        Session({
            name: 'TEMPLATE_MS_SESSION',
            store: MongoStore.create({ mongoUrl: config.MONGO_CONNECTION }),
            secret: config.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
            }
        })
    )
}
