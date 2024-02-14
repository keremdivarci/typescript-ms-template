import Joi from 'joi'
import { id, email } from '../common'
import j2s from 'joi-to-swagger'

export const jwtToken = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)

export const login = Joi.object({
    token: jwtToken.required()
})

export const userSession = Joi.object({
    id: id.required(),
    email: email.required(),
    name: Joi.string().required(),
    exp: Joi.number().required(),
    iat: Joi.number().required()
})

export const baseInput = Joi.object({
    user: userSession.required(),
    body: Joi.alternatives(login).required(),
    query: Joi.forbidden()
}).required()

export const baseOutput = Joi.object({
    result: Joi.any().required(),
    message: Joi.string()
}).required()

export const loginSchema = j2s(login).swagger
