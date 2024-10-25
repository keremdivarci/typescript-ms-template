import Joi from 'joi'
import { queryImageSchema, uploadImageSchema } from '../template.schemas'
import { baseIdInput, baseInput, userSession } from '../../common'

export const queryTemplateImage = baseInput
    .keys({
        user: userSession.optional(),
        body: Joi.forbidden(),
        params: queryImageSchema.required()
    })
    .meta({ className: 'QueryTemplateImageInput' })

export const uploadTemplateImage = baseInput
    .keys({
        body: uploadImageSchema.required()
    })
    .meta({ className: 'UploadTemplateImageInput' })

export const removeTemplateImage = baseInput
    .keys({
        body: Joi.forbidden(),
        params: baseIdInput.required()
    })
    .meta({ className: 'RemoveTemplateImageInput' })
