import { validate } from 'backend-helper-kit'
import { decode } from 'backend-helper-kit'

import * as validators from '../validators/params/user'
import type { user } from '../types/params/user'

import { variables as config } from '../../config'

export function getUserFromToken(token: string): user {
    const result = decode(token, config.MODULE_KEY)
    let { iat, exp, ...data } = result
    const value = validate(data, validators.user)

    return value
}
