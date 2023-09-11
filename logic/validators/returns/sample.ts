import Joi from 'joi'

export const getSample = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required()
})

export const createSample = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required()
})

export const updateSample = Joi.boolean().required()

export const deleteSample = Joi.boolean().required()

export const getSamples = Joi.array().items(getSample).required()
