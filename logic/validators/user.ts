import * as Joi from 'joi'
import { joiObjectId } from 'ts-joi-objectid'

const objectId = joiObjectId(Joi)

export const user = Joi.object({
    id: objectId().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    permissions: Joi.any().required()
})

export const login = Joi.object({
    //jwt token regex
    token: Joi.string()
        .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
        .required()
})
