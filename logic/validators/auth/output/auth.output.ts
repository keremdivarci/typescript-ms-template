import { baseOutput } from '../common'
import { userSession } from '../common'

export const login = baseOutput
    .keys({
        result: userSession.required()
    })
    .required()

export const checkSession = baseOutput

export const logout = baseOutput
