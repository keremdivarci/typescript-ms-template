import Joi from 'joi'
import { authUser, user, base, query, jwtToken } from '../user/common'

// delete permissions from authUser
export const register = base.keys({
    body: authUser.required(),
    query: query.forbidden(),
    user: user.forbidden()
})

export const login = base.keys({
    body: Joi.alternatives(authUser, jwtToken),
    query: query.forbidden(),
    user: user.forbidden()
})

export const logout = base.keys({
    user: user.required(),
    query: query.forbidden(),
    body: authUser.forbidden()
})

export const getPermissions = base.keys({
    query: query.required(),
    user: user.required()
})

export const addPermissions = base.keys({
    body: Joi.object({
        permissionPath: Joi.array().items(Joi.string()).required(),
        permission: Joi.any().required()
    }),
    user: user.required()
})

export const removePermissions = base.keys({
    body: Joi.object({
        permissionPath: Joi.array().items(Joi.string()).required(),
        permission: Joi.any().required()
    }),
    user: user.required()
})
