import { validate } from './logic/helpers/validate'
import Joi from 'joi'

import * as dotenv from 'dotenv'

dotenv.config()
const env: config = process.env as any

type config = {
    PORT: number
    MONGO_CONNECTION: string
    MODULE_NAME: string
    MODULE_KEY: string
    SESSION_SECRET: string
    SAMPLE_MS: string
    ENV: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    SAMPLE_MS: Joi.string().uri().required(),
    ENV: Joi.string().valid('development', 'production').required()
})

export var variables = validate(
    {
        PORT: env.PORT,
        MONGO_CONNECTION: env.MONGO_CONNECTION,
        MODULE_KEY: env.MODULE_KEY,
        MODULE_NAME: env.MODULE_NAME,
        SESSION_SECRET: env.SESSION_SECRET,
        SAMPLE_MS: env.SAMPLE_MS,
        ENV: env.ENV
    },
    configSchema
)
