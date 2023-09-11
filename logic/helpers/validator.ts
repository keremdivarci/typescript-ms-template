import { variables as config } from '../../config'

import * as paramSchemas from '../validators/params'
import * as resultSchemas from '../validators/returns'

import { validate } from './validate'

// let decorate
export function avalidator(target: any, name: string, descriptor: any) {
    const originalFunction = descriptor.value

    if (config.ENV === 'development') {
        descriptor.value = async function (params: any) {
            let value = validate(params, (paramSchemas as any)[name])
            const result = await originalFunction.call(this, value)
            return validate(result, (resultSchemas as any)[name])
        }
    } else if (config.ENV === 'production') {
        descriptor.value = async function (params: any) {
            let value = validate(params, (paramSchemas as any)[name])
            return await originalFunction.call(this, value)
        }
    }
    return descriptor
}
