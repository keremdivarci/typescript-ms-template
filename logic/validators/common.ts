import Joi from 'joi'

export const id = Joi.string().meta({ className: 'Id' })
export const objectId = Joi.string().hex().length(24).meta({ className: 'ObjectId' })
export const email = Joi.string().email().meta({ className: 'Email' })

export const jwtToken = Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
    .meta({ className: 'JwtToken' })

export const baseIdInput = Joi.object({
    id: objectId.required()
}).meta({ className: 'BaseIdInput' })

export const userSession = Joi.object({
    id: id.required(),
    email: email.required(),
    name: Joi.string().required(),
    exp: Joi.number().required(),
    iat: Joi.number().required()
}).meta({ className: 'UserSession' })

// Base
export const baseInput = Joi.object({
    user: userSession.optional(),
    body: Joi.any(),
    query: Joi.forbidden()
}).meta({ className: 'BaseInput' })

export const baseOutput = Joi.object({
    result: Joi.any().required(),
    message: Joi.string()
}).meta({ className: 'BaseOutput' })
