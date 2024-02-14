import Joi from 'joi'
import { baseInput, queryTemplatesData, createTemplateData, updateTemplateData, removeTemplateData } from '../common'
import { userSession } from '../../auth/common'

export const queryTemplates = baseInput.keys({
    user: userSession.optional(),
    body: Joi.forbidden(),
    query: queryTemplatesData.required()
})

export const createTemplate = baseInput.keys({
    body: createTemplateData.required()
})

export const updateTemplate = baseInput.keys({
    body: updateTemplateData.required()
})

export const removeTemplate = baseInput.keys({
    body: Joi.forbidden(),
    query: removeTemplateData.required()
})
