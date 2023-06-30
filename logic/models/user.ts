import { validate } from '../helpers/validator'
import { decode } from '../helpers/JWT'

import * as validators from '../validators/user'
import type { user } from '../types/user'

import { ForbiddenError } from '../../errors/errors'

export function getUserFromToken(token: string): user {
    const result = decode(token)
    let { iat, exp, ...data } = result
    const value = validate(data, validators.user)

    return value
}

export function hasAccess(access: string[], user: user): { result: true } {
    // const value = validate(data, validators.user) as types.user

    let tempPermissons = user.permissions
    access.forEach((item) => {
        if (tempPermissons[item]) {
            tempPermissons = tempPermissons[item]
        } else {
            throw new ForbiddenError(`You not have ${access.join('->')} access`)
        }
    })

    return {
        result: true
    }
}
