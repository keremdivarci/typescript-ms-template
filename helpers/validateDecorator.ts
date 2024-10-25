import { validate } from 'backend-helper-kit'
import { baseInput, baseOutput } from '../logic/validators/common'

export function asyncValidator(config: any, inputTypes: any, outputTypes?: any) {
    return function (constructor: any) {
        // Handle instance methods
        for (const name of Object.getOwnPropertyNames(constructor.prototype)) {
            const method = constructor.prototype[name]

            if (typeof method === 'function' && !method.skipValidation && name !== 'constructor') {
                applyValidation(constructor.prototype, name, method, config, inputTypes, outputTypes)
            }
        }

        // Handle static methods
        for (const name of Object.getOwnPropertyNames(constructor)) {
            const method = constructor[name]

            if (typeof method === 'function' && !method.skipValidation) {
                applyValidation(constructor, name, method, config, inputTypes, outputTypes)
            }
        }
    }
}

// Helper function to apply validation logic
function applyValidation(target: any, name: string, method: any, config: any, inputTypes: any, outputTypes: any) {
    const originalFunction = method

    const inputValidator = inputTypes ? (inputTypes as any)[name] : baseInput
    const outputValidator = outputTypes ? (outputTypes as any)[name] : baseOutput

    target[name] = async function (params: any) {
        if (config.ENV === 'development') {
            let value = validate(params, inputValidator)
            const result = await originalFunction.call(this, value)
            return validate(result, outputValidator)
        } else if (config.ENV === 'production') {
            let value = validate(params, inputValidator)
            return await originalFunction.call(this, value)
        }
    }
}
