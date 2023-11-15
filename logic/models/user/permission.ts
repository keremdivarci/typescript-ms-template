import * as inputTypes from '../../types/user/input-type'
import * as outputTypes from '../../types/user/output-type'
import * as commonTypes from '../../types/user/common'

import * as inputValidators from '../../validators/user/input-type'
import * as outputValidators from '../../validators/user/output-type'

import { avalidator as wrapper } from 'backend-helper-kit'

import { config } from '../../../config'

const avalidator = wrapper(inputValidators, outputValidators, config)

export class PermissionLogic {
    @avalidator
    static async addPermission(params: inputTypes.addPermissions): Promise<outputTypes.addPermissions | void> {}

    @avalidator
    static async removePermission(params: inputTypes.removePermissions): Promise<outputTypes.removePermissions | void> {}

    @avalidator
    static async getPermissions(params: inputTypes.getPermissions): Promise<outputTypes.getPermissions> {}

    static checkPermission(requires?: any, user?: commonTypes.user): boolean {
        if (!requires) {
            return true
        }

        return false
    }
}
