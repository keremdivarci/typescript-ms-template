import { Express, Request, Response, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDefinition from './swagger.def'

export async function documentateApi(app: Express) {
    app.use(
        '/docs',
        (req: Request, res: Response, next: NextFunction) => {
            if (req.originalUrl === '/docs') return res.redirect('/docs/')
            next()
        },
        swaggerUi.serve,
        swaggerUi.setup(swaggerDefinition)
    )
    swaggerUi.generateHTML(swaggerDefinition)
}
