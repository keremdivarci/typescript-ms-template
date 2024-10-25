import { loginSchema } from '../../../logic/validators/auth/auth.schemas'

//Swagger Definitions
const swCheckSession = {
    summary: 'Checks user session',
    tags: ['auth - fetch data'],
    responses: {
        '200': {
            description: 'Returns true if user logged in, false otherwise'
        }
    }
}

const swLogin = {
    summary: 'Signs in user',
    tags: ['auth - send data'],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    ...loginSchema
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'OK'
        },
        default: {
            description: 'Error message'
        }
    }
}

const swLogout = {
    summary: 'signs out user',
    tags: ['auth - fetch data'],
    responses: {
        '200': {
            description: 'OK'
        },
        '403': {
            description: 'Returns Forbidden error if user not logged in'
        }
    }
}

//Swagger Router
const swAuthRouter = {
    '/auth/check': {
        get: {
            ...swCheckSession
        }
    },
    '/auth/login': {
        post: {
            ...swLogin
        }
    },
    '/auth/logout': {
        get: {
            ...swLogout
        }
    }
}

export { swAuthRouter }
