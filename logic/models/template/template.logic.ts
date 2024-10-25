import { TemplateModel } from '../../../database/models/template'
import { ErrorHelper } from 'backend-helper-kit'

import { filterQuerySize, defaultProjection, asyncValidator } from '../../../helpers'
import { saveFile } from '../../../utils/saveFile'

import * as inputTypes from '../../validators/template/input/template.input'
import { CreateTemplateInput, QueryTemplatesInput, RemoveTemplateInput, UpdateTemplateInput } from '../../types/template/input/template.input'
import { BaseOutput } from '../../types/common'
import { config } from '../../../config'

const errorHelper = new ErrorHelper(__filename)

@asyncValidator(config, inputTypes)
export class TemplateLogic {
    static async queryTemplates(params: QueryTemplatesInput): Promise<BaseOutput> {
        const data = params.query
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

    static async createTemplate(params: CreateTemplateInput): Promise<BaseOutput> {
        const data = params.body

        const template = new TemplateModel() //Create new template instance
        const fileSaved = await saveFile(data.files as any, String(template._id), 'uploads', 1) //Save file to disk
        if (!fileSaved) return { result: false, message: 'File could not be saved!' }
        //* Need a userSession to get the user id, input manually if you want to skip authentication
        template.set({ ...data, createdBy: params.user.id }) //Set data to template
        const result = await template.save() //Save template to database

        errorHelper.createError({ result })

        return { result: !!result, message: result ? 'Template has been created successfully!' : undefined }
    }

    static async updateTemplate(params: UpdateTemplateInput): Promise<BaseOutput> {
        const data = params.body
        if (data.files) {
            await saveFile(data.files, data.id, 'uploads', 1)
        }

        const result = await TemplateModel.updateOne({ _id: data.id }, data)
        errorHelper.updateError({ result })
        return { result: result.modifiedCount > 0, message: result.modifiedCount > 0 ? 'Event updated successfully!' : undefined }
    }

    static async deleteTemplate(params: RemoveTemplateInput): Promise<BaseOutput> {
        const data = params.query
        const result = await TemplateModel.findByIdAndUpdate(data.id, { isDeleted: true })

        errorHelper.deleteError({ result })

        return { result: !!result, message: result ? 'Template has been deleted successfully!' : undefined }
    }
}
