import * as params from '../types/params/sample'
import * as returns from '../types/returns/sample'

import { SampleModel } from '../../database/models/sample'

import { ErrorHelper } from 'backend-helper-kit'

import { avalidator } from '../validators/validator'

import { filter } from 'backend-helper-kit'

const errorHelper = new ErrorHelper(__filename)

export class SampleLogic {
    @avalidator
    static async createSample(params: params.createSample): Promise<returns.createSample> {
        var result = await SampleModel.create(params.body)
        errorHelper.createError(result)

        result = result.toObject()
        return filter(result, ['_id'])
    }

    @avalidator
    static async updateSample(params: params.updateSample): Promise<returns.updateSample> {
        var result = await SampleModel.updateOne(params.query, { $set: params.body })
        errorHelper.updateError(result)

        return result.modifiedCount > 0
    }

    @avalidator
    static async deleteSample(params: params.deleteSample): Promise<returns.deleteSample> {
        var result = await SampleModel.deleteOne(params.query)
        errorHelper.deleteError(result)

        return result.deletedCount > 0
    }

    @avalidator
    static async getSample(params: params.getSample): Promise<returns.getSample> {
        var result = await SampleModel.findOne(params.query, { _id: 0 })
        errorHelper.getError(result)

        return result!.toObject()
    }

    @avalidator
    static async getSamples(params: params.getSamples): Promise<returns.getSamples> {
        var result = await SampleModel.find(params.query, { _id: 0 })
        errorHelper.getAllError(result)

        return result.map((item) => {
            return item.toObject()
        })
    }
}
