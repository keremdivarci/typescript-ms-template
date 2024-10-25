import { decode, validate } from 'backend-helper-kit'

import { UserSession } from '../../types/common'
import { LoginInput } from '../../types/auth/input'
import { LoginOutput } from '../../types/auth/output/auth.output'

import { loginSchema } from '../../validators/auth/auth.schemas'
import { config } from '../../../config'

export class AuthLogic {
    static async login(params: LoginInput): Promise<LoginOutput> {
        const data = validate(params.body, loginSchema)
        return { result: decode(data.token, config.MODULE_KEY) as UserSession }
    }
}
