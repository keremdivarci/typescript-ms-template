import { injectable } from 'tsyringe'
import { parseFormData } from '../utils/parseFormData'

import { TemplateLogic } from '../logic/models/template'
import { CreateTemplateSchema, UpdateTemplateSchema } from '../logic/types/template'

@injectable()
export class TemplateService {
    async queryTemplates(query: any) {
        return await TemplateLogic.queryTemplates({ query })
    }

    async createTemplate(req: any) {
        const data = await parseFormData(req, ['image/png', 'image/jpg', 'image/jpeg'], ['records'])
        return await TemplateLogic.createTemplate({
            body: { ...data.fields, files: data.files } as CreateTemplateSchema,
            user: req.session.user
        })
    }

    async updateTemplate(req: any) {
        const data = await parseFormData(req, ['image/png', 'image/jpg', 'image/jpeg'], ['records'])
        return await TemplateLogic.updateTemplate({
            body: { ...data.fields, files: data.files } as UpdateTemplateSchema,
            user: req.session.user
        })
    }

    async deleteTemplate(id: string) {
        return await TemplateLogic.deleteTemplate({ query: { id } })
    }
}
