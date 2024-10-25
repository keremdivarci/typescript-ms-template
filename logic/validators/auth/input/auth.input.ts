import Joi from 'joi'
import { baseInput, userSession } from '../../common'
import { loginSchema } from '../auth.schemas'

export const login = baseInput
    .keys({
        user: userSession.forbidden(),
        body: loginSchema.required()
    })
    .meta({ className: 'LoginInput' })

export const checkSession = baseInput
    .keys({
        user: userSession.required(),
        body: Joi.forbidden()
    })
    .meta({ className: 'CheckSessionInput' })

export const logout = baseInput
    .keys({
        user: userSession.required(),
        body: Joi.forbidden()
    })
    .meta({ className: 'LogoutInput' })
