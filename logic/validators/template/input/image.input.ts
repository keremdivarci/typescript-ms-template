import Joi from 'joi'
import { baseInput, queryImageData, uploadImageData, removeImageData } from '../common'
import { userSession } from '../../auth/common'

export const queryTemplateImage = baseInput.keys({
    user: userSession.optional(),
    body: Joi.forbidden(),
    params: queryImageData.required()
})

export const uploadTemplateImage = baseInput.keys({
    body: uploadImageData.required()
})

export const removeTemplateImage = baseInput.keys({
    body: Joi.forbidden(),
    params: removeImageData.required()
})
