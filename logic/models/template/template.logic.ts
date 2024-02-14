import { TemplateModel } from '../../../database/models/template'
import { ErrorHelper, validate } from 'backend-helper-kit'

import * as inputTypes from '../../types/template/input/template.input'
//import * as outputTypes from '../../types/template/output/template.output'
import * as validationTypes from '../../types/template/common'

import * as validators from '../../validators/template/common'

import { filterQuerySize, defaultProjection } from '../../helpers'
import { saveFile } from '../../utils/saveFile'

const errorHelper = new ErrorHelper(__filename)

export class TemplateLogic {
    static async queryTemplates(params: inputTypes.queryTemplates): Promise<validationTypes.baseOutput> {
        const data = validate(params.query, validators.queryTemplatesData) as validationTypes.queryTemplatesData
        let result
        if (data.pageSize === -1) {
            result = await TemplateModel.find({ isDeleted: false }).sort({ _id: -1 }).select(defaultProjection).lean().exec()
        } else {
            const skip = filterQuerySize(data.page ?? 5, data.pageSize ?? 1)
            result = await TemplateModel.find({ isDeleted: false })
                .sort({ _id: -1 })
                .select(defaultProjection)
                .skip(skip)
                .limit(data.pageSize || 5)
        }

        errorHelper.getAllError({ result, text: 'No template record found in database!' })
        return { result }
    }

    static async createTemplate(params: inputTypes.createTemplate): Promise<validationTypes.baseOutput> {
        const data = validate(params.body, validators.createTemplateData) as validationTypes.createTemplateData

        const template = new TemplateModel() //Create new template instance
        const fileSaved = await saveFile(data.files as any, String(template._id), 'uploads', 1) //Save file to disk
        if (!fileSaved) return { result: false, message: 'File could not be saved!' }
        //* Need a userSession to get the user id, input manually if you want to skip authentication
        template.set({ ...data, createdBy: params.user.id }) //Set data to template
        const result = await template.save() //Save template to database

        errorHelper.createError({ result })

        return { result: !!result, message: result ? 'Tempate has been created successfully!' : undefined }
    }

    static async updateTemplate(params: inputTypes.updateTemplate): Promise<validationTypes.baseOutput> {
        const data = validate(params.body, validators.updateTemplateData) as validationTypes.updateTemplateData

        if (data.files) {
            await saveFile(data.files, data.id, 'uploads', 1)
        }

        const result = await TemplateModel.updateOne({ _id: data.id }, data)
        errorHelper.updateError({ result })
        return { result: result.modifiedCount > 0, message: result.modifiedCount > 0 ? 'Event updated successfully!' : undefined }
    }

    static async deleteTemplate(params: inputTypes.removeTemplate): Promise<validationTypes.baseOutput> {
        const data = validate(params.query, validators.removeTemplateData) as validationTypes.removeTemplateData
        const result = await TemplateModel.findByIdAndUpdate(data.id, { isDeleted: true })

        errorHelper.deleteError({ result })

        return { result: !!result, message: result ? 'Template has been deleted successfully!' : undefined }
    }
}
