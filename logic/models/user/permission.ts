import * as inputTypes from '../../types/user/input-type'
import * as outputTypes from '../../types/user/output-type'
import * as commonTypes from '../../types/user/common'

import * as inputValidators from '../../validators/user/input-type'
import * as outputValidators from '../../validators/user/output-type'

import { deleteId, avalidator as wrapper } from 'backend-helper-kit'

import { config } from '../../../config'
import { UserModel } from '../../../database/models/user'

// import { UserModel } from '../../../database/models/user'

const avalidator = wrapper(inputValidators, outputValidators, config)

export class PermissionLogic {
    @avalidator
    static async addPermission(params: inputTypes.addPermission): Promise<outputTypes.addPermission | void> {}

    @avalidator
    static async removePermission(params: inputTypes.removePermission): Promise<outputTypes.removePermission | void> {}

    @avalidator
    @deleteId
    static async getPermission(params: inputTypes.getPermission): Promise<outputTypes.getPermission> {
        let permissions = await UserModel.findOne({ username: params.query.username })

        return permissions?.permissions
    }

    static checkPermission(requires?: any, user?: commonTypes.user): boolean {
        if (!requires) {
            return true
        }

        return false
    }
}
