import Joi from 'joi'
import { baseIdInput, objectId } from '../common'
import j2s from 'joi-to-swagger'

//* Template CRUD Schemas
export const queryTemplatesSchema = Joi.object({
    page: Joi.number().default(1),
    pageSize: Joi.number().default(5)
}).meta({ className: 'QueryTemplatesSchema' })

export const createTemplateSchema = Joi.object({
    files: Joi.any().meta({ swaggerType: 'file' }).required(),
    name: Joi.string().required(),
    records: Joi.array().items(Joi.object().required()).required()
}).meta({ className: 'CreateTemplateSchema' })

export const updateTemplateSchema = Joi.object({
    files: Joi.any().meta({ swaggerType: 'file' }),
    id: objectId.required(),
    name: Joi.string(),
    records: Joi.array()
}).meta({ className: 'UpdateTemplateSchema' })

//* Template Image CRUD Schemas
export const queryImageSchema = baseIdInput.meta({ className: 'QueryImageSchema' })

export const uploadImageSchema = Joi.object({
    files: Joi.any().required(),
    id: objectId.required()
}).meta({ className: 'UploadImageSchema' })

//* Swagger
export const queryTemplateSwagger = j2s(queryTemplatesSchema).swagger
export const createTemplateSwagger = j2s(createTemplateSchema).swagger
export const updateTemplateSwagger = j2s(updateTemplateSchema).swagger

export const queryImageSwagger = j2s(queryImageSchema).swagger
export const uploadImageSwagger = j2s(uploadImageSchema).swagger
