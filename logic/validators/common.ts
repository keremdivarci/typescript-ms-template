import Joi from 'joi'

export const id = Joi.string()
export const objectId = Joi.string().hex().length(24)
export const email = Joi.string().email()

export const baseIdInput = Joi.object({
    id: objectId.required()
})
