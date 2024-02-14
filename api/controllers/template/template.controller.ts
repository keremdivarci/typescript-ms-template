import { TemplateLogic } from '../../../logic/models/template'
import { ahandler as async_handler, returnFormatter } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'
import { userSession } from '../../../logic/types/auth/common'

import { parseFormData } from '../../../logic/utils/parseFormData'
import { createTemplate, updateTemplate } from '../../../logic/types/template/input/template.input'

export class TemplateController {
    @async_handler
    static async queryTemplates(req: Request, res: Response, next: NextFunction) {
        res.json((await TemplateLogic.queryTemplates({ query: req.query })).result)
    }

    @async_handler
    static async createTemplate(req: Request, res: Response, next: NextFunction) {
        const acceptedMimetypes = ['image/png', 'image/jpg', 'image/jpeg']
        const data = await parseFormData(req, acceptedMimetypes, ['records'])
        const result = await TemplateLogic.createTemplate({
            body: { ...data.fields, files: data.files } as createTemplate['body'] /*Modify this line to match the type of the body*/,
            user: req.session.user as userSession
        })

        return res.json(returnFormatter(result))
    }

    @async_handler
    static async updateTemplate(req: Request, res: Response, next: NextFunction) {
        const acceptedMimetypes = ['image/png', 'image/jpg', 'image/jpeg']
        const data = await parseFormData(req, acceptedMimetypes, ['records'])
        const result = await TemplateLogic.updateTemplate({
            body: { ...data.fields, files: data.files } as updateTemplate['body'] /*Modify this line to match the type of the body*/,
            user: req.session.user as userSession
        })
        return res.json(returnFormatter(result))
    }

    @async_handler
    static async deleteTemplate(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as string
        const result = await TemplateLogic.deleteTemplate({ query: { id }, user: req.session.user as userSession })
        return res.json(returnFormatter(result))
    }
}
