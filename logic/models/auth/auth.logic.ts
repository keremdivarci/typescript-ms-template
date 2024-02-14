import { decode, validate } from 'backend-helper-kit'

import { userSession } from '../../types/auth/common'
import * as inputTypes from '../../types/auth/input/auth.input'
import * as outputTypes from '../../types/auth/output/auth.output'

import * as validators from '../../validators/auth/common'
import { config } from '../../../config'

export class AuthLogic {
    static async login(params: inputTypes.login): Promise<outputTypes.login> {
        const data = validate(params.body, validators.login)
        return { result: decode(data.token, config.MODULE_KEY) as userSession }
    }
}
