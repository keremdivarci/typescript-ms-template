import Joi from 'joi'
import { queryTemplatesSchema, createTemplateSchema, updateTemplateSchema } from '../template.schemas'
import { baseIdInput, baseInput, userSession } from '../../common'

export const queryTemplates = baseInput
    .keys({
        user: userSession.optional(),
        body: Joi.forbidden(),
        query: queryTemplatesSchema.required()
    })
    .meta({ className: 'QueryTemplatesInput' })

export const createTemplate = baseInput
    .keys({
        user: userSession.required(),
        body: createTemplateSchema.required()
    })
    .meta({ className: 'CreateTemplateInput' })

export const updateTemplate = baseInput
    .keys({
        body: updateTemplateSchema.required()
    })
    .meta({ className: 'UpdateTemplateInput' })

export const removeTemplate = baseInput
    .keys({
        body: Joi.forbidden(),
        query: baseIdInput.required()
    })
    .meta({ className: 'RemoveTemplateInput' })
