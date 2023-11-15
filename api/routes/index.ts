import { sampleRouter } from './sample'
import { authRouter } from './user/auth'
import { permissionRouter } from './user/permission'

import { Express } from 'express'

export function addRoutes(app: Express) {
    app.use('/auth', authRouter)
    app.use('/sample', sampleRouter)
    app.use('/permission', permissionRouter)
}
