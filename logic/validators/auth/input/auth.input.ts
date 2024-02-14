import Joi from 'joi'
import { baseInput, userSession } from '../common'

export const login = baseInput.keys({
    user: userSession.forbidden()
})

export const checkSession = baseInput.keys({
    body: Joi.forbidden()
})

export const logout = baseInput.keys({
    body: Joi.forbidden()
})
