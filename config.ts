import { validate } from 'backend-helper-kit'
import Joi from 'joi'
import dotenv from 'dotenv'
dotenv.config()

type configType = {
    PORT: number
    MONGO_CONNECTION: string
    MODULE_KEY: string
    SESSION_SECRET: string
    ENV: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    ENV: Joi.string().valid('development', 'production').required()
})

export const config: configType = validate(
    {
        PORT: process.env.PORT,
        MONGO_CONNECTION: process.env.MONGO_CONNECTION,
        MODULE_KEY: process.env.MODULE_KEY,
        SESSION_SECRET: process.env.SESSION_SECRET,
        ENV: process.env.ENV
    },
    configSchema
)

console.log(config)
