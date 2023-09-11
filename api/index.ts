// Require dependencies
import Express from 'express' // Http server
import Morgan from 'morgan' // Terminal logging
import { status500 } from '../api/middlewares/handle' // Error Models
import Session from 'express-session' //Express session manager
import MongoStore from 'connect-mongo' //Session manager for MongoDB, Express
import { variables as config } from '../config'
// Initilaziation
const app = Express()

import type { user } from '../logic/types/params/user'
declare module 'express-session' {
    interface SessionData {
        user: user
        cookie: Cookie
    }
}

// Session Start
app.use(
    Session({
        name: 'PROJECT_PHPSESSID',
        store: MongoStore.create({ mongoUrl: config.MONGO_CONNECTION }),
        secret: config.SESSION_SECRET,
        saveUninitialized: true,
        resave: false
    })
)

// Middlewares
app.use(Morgan('dev'))
app.use(Express.json({ limit: '10mb' }))

app.use((req, res, next) => {
    // allow all origins
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
    } else {
        res.header('Access-Control-Allow-Origin', '*')
    }
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-PINGOTHER')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, HEAD, OPTIONS')
    res.header('Access-Control-Expose-Headers', 'Set-Cookie')
    next()
})

// routes
import { router as authRouter } from './routes/auth'
import { router as sampleRouter } from './routes/sample'

app.use('/auth', authRouter)
app.use('/sample', sampleRouter)

// Error Handling
app.use(status500)

// Listen for requests
app.listen(config.PORT, () => console.log(`Server running! ✅`))

export { app }
