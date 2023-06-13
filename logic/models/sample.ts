import * as validators from '../validators/sample'
import { validate } from '../helpers/validator'
import * as types from '../types/sample'

import { SampleModel } from '../../database/models/sample'

import { DatabaseError, NotFoundError } from '../../errors/errors'

export async function createSample(params: any) {
    const value = validate(validators.createSample, params) as types.createSample

    const result = await SampleModel.create(value)

    if (!result) {
        throw new DatabaseError('Error creating sample')
    }

    return result
}

export async function updateSample(params: any) {
    const value = validate(validators.updateSample, params) as types.updateSample

    const result = await SampleModel.updateOne({ name: value.name }, value.sample, { new: true })

    if (result.matchedCount === 0) {
        throw new NotFoundError('Sample not found!')
    }

    return { result: result.modifiedCount > 0 }
}

export async function deleteSample(params: any) {
    const value = validate(validators.deleteSample, params) as types.deleteSample

    const result = await SampleModel.deleteOne({ name: value.name })

    return { result: result.deletedCount > 0 }
}

export async function getSample(params: any) {
    const value = validate(validators.getSample, params) as types.getSample

    const result = await SampleModel.findOne(value)

    return result
}

export async function getSamples(params: any) {
    const value = validate(validators.getSample, params) as types.getSample

    const result = await SampleModel.find(value)

    return result
}
