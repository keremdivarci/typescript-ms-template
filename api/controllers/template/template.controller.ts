import { Request, Response, NextFunction } from 'express'
import { inject, Lifecycle, scoped } from 'tsyringe'
import { ahandler as async_handler } from 'backend-helper-kit'
import { TemplateService } from '../../../services/template.service'

@scoped(Lifecycle.ContainerScoped)
export class TemplateController {
    constructor(@inject(TemplateService) private templateService: TemplateService) {}

    @async_handler
    async queryTemplates(req: Request, res: Response, next: NextFunction) {
        const result = await this.templateService.queryTemplates(req.query)
        res.json(result)
    }
    @async_handler
    async createTemplate(req: Request, res: Response, next: NextFunction) {
        const result = await this.templateService.createTemplate(req)
        res.json(result)
    }
    @async_handler
    async updateTemplate(req: Request, res: Response, next: NextFunction) {
        const result = await this.templateService.updateTemplate(req)
        res.json(result)
    }
    @async_handler
    async deleteTemplate(req: Request, res: Response, next: NextFunction) {
        const result = await this.templateService.deleteTemplate(req.params.id)
        res.json(result)
    }
}
