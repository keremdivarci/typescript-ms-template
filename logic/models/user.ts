import { validate } from '../helpers/validate'
import { decode } from '../helpers/JWT'

import * as validators from '../validators/params/user'
import type { user } from '../types/params/user'

export function getUserFromToken(token: string): user {
    const result = decode(token)
    let { iat, exp, ...data } = result
    const value = validate(data, validators.user)

    return value
}
