import { swAuthRouter } from '../routes/auth/auth.doc'
import { swTemplateRouter } from '../routes/template/template.doc'
import { config } from '../../config'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Template MS API',
        version: '1.0.0',
        description: 'Template MS API Documentation',
        license: {
            name: 'Licensed Under CC-BY-NC-4.0',
            url: 'https://creativecommons.org/licenses/by-nc/4.0/'
        },
        contact: {
            name: 'M. KEREM DIVARCI',
            url: 'https://linkedin.com/in/keremdivarci/'
        }
    },
    servers: [
        {
            url: 'http://localhost:' + config.PORT,
            description: 'Development server'
        }
    ],
    paths: {
        ...swAuthRouter,
        ...swTemplateRouter
    }
}

export default swaggerDefinition
