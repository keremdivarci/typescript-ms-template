import * as validators from '../validators/sample'
import { validate } from '../helpers/validator'
import * as types from '../types/sample'

import { SampleModel, Sample } from '../../database/models/sample'

import { ErrorHelper } from '../helpers/error'
import { getModelName } from '../helpers/filename'

const errorHelper = new ErrorHelper(getModelName(__filename))

export async function createSample(params: any): Promise<{ result: Sample }> {
    const value = validate(validators.createSample, params) as types.createSample

    const result = (await SampleModel.create(value)) as Sample
    errorHelper.createError(result)

    return { result: result }
}

export async function updateSample(params: any): Promise<{ result: boolean }> {
    const value = validate(validators.updateSample, params) as types.updateSample

    const result = await SampleModel.updateOne({ name: value.name }, value.sample, { new: true })
    errorHelper.updateError(result)

    return { result: result.modifiedCount > 0 }
}

export async function deleteSample(params: any): Promise<{ result: boolean }> {
    const value = validate(validators.deleteSample, params) as types.deleteSample

    const result = await SampleModel.deleteOne(value)
    errorHelper.deleteError(result)

    return { result: result.deletedCount > 0 }
}

export async function querySample(params: any): Promise<{ result: Sample }> {
    const value = validate(validators.getSample, params) as types.getSample

    const result = (await SampleModel.findOne(value)) as Sample
    errorHelper.getError(result)

    return { result: result }
}

export async function querySamples(params: any): Promise<{ result: Sample[] }> {
    const value = validate(validators.getSample, params) as types.getSample

    const result = (await SampleModel.find(value)) as Sample[]
    errorHelper.getAllError(result)

    return { result: result }
}
