import { authRouter } from './auth/auth.routes'
import { templateRouter } from './template/template.routes'
import { templateImageRouter } from './template/image.routes'

import { Express } from 'express'

export function addRoutes(app: Express) {
    app.use('/auth', authRouter)
    app.use('/template', templateRouter)
    app.use('/template/image', templateImageRouter)
}
