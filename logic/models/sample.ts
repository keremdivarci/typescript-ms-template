import * as validators from '../validators/sample'
import { validate } from '../helpers/validator'
import * as types from '../types/sample'

import { SampleModel } from '../../database/models/sample'

import { DatabaseError, NotFoundError } from '../../errors/errors'

import { ErrorHelper } from '../helpers/error'

const filename = __filename
    .split(/(\\|\/)/g)
    .pop()
    ?.replace('.ts', '') as string

const errorHelper = new ErrorHelper(filename)

export async function createSample(params: any) {
    const value = validate(validators.createSample, params) as types.createSample

    const result = await SampleModel.create(value)
    errorHelper.createError(result)

    return result
}

export async function updateSample(params: any) {
    const value = validate(validators.updateSample, params) as types.updateSample

    const result = await SampleModel.updateOne({ name: value.name }, value.sample, { new: true })
    errorHelper.updateError(result)

    return { result: result.modifiedCount > 0 }
}

export async function deleteSample(params: any) {
    const value = validate(validators.deleteSample, params) as types.deleteSample

    const result = await SampleModel.deleteOne({ name: value.name })
    errorHelper.deleteError(result)

    return { result: result.deletedCount > 0 }
}

export async function getSample(params: any) {
    const value = validate(validators.getSample, params) as types.getSample

    const result = await SampleModel.findOne(value)
    errorHelper.getError(result)

    return result
}

export async function getSamples(params: any) {
    const value = validate(validators.getSample, params) as types.getSample

    const result = await SampleModel.find(value)
    errorHelper.getAllError(result)

    return result
}
