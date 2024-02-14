import Joi from 'joi'
import { baseIdInput, objectId } from '../common'
import { userSession } from '../auth/common'
import j2s from 'joi-to-swagger'

//* Template CRUD Schemas
export const queryTemplatesData = Joi.object({
    page: Joi.number().default(1),
    pageSize: Joi.number().default(5)
}).required()

export const createTemplateData = Joi.object({
    files: Joi.any().meta({ swaggerType: 'file' }).required(),
    name: Joi.string().required(),
    records: Joi.array().items(Joi.object().required()).required()
}).required()

export const updateTemplateData = Joi.object({
    files: Joi.any().meta({ swaggerType: 'file' }),
    id: objectId.required(),
    name: Joi.string(),
    records: Joi.array()
}).required()

export const removeTemplateData = baseIdInput.required()

//* Template Image CRUD Schemas
export const queryImageData = baseIdInput.required()

export const uploadImageData = Joi.object({
    files: Joi.any().required(),
    id: objectId.required()
}).required()

export const removeImageData = baseIdInput.required()

//* Bases
export const baseInput = Joi.object({
    user: userSession.required(),
    body: Joi.alternatives(createTemplateData, updateTemplateData, uploadImageData).required(),
    query: Joi.forbidden()
}).required()

export const baseOutput = Joi.object({
    result: Joi.any().required(),
    message: Joi.string()
}).required()

//* Swagger Schemas
export const queryTemplateSchema = j2s(queryTemplatesData).swagger
export const createTemplateSchema = j2s(createTemplateData).swagger
export const updateTemplateSchema = j2s(updateTemplateData).swagger
export const removeTemplateSchema = j2s(removeTemplateData).swagger

export const queryImageSchema = j2s(queryImageData).swagger
export const uploadImageSchema = j2s(uploadImageData).swagger
export const removeImageSchema = j2s(removeImageData).swagger
