import * as types from '../../types/params/user'

export function checkAccess(requires?: any, user?: types.user): boolean {
    if (!requires) {
        return true
    }

    /*
        Do something here
    */

    return false
}
