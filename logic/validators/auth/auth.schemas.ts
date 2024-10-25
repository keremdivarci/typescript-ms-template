import Joi from 'joi'
import { jwtToken } from '../common'
import j2s from 'joi-to-swagger'

export const loginSchema = Joi.object({
    token: jwtToken.required()
}).meta({ className: 'LoginSchema' })

export const loginSwagger = j2s(loginSchema).swagger
