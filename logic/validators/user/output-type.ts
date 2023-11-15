import Joi from 'joi'

export const register = Joi.boolean()

export const login = Joi.boolean()

export const logout = Joi.boolean()

export const getPermissions = Joi.any()

export const addPermissions = Joi.boolean()

export const removePermissions = Joi.boolean()
