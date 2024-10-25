import { Router } from 'express'
import { requireAuth } from '../../middlewares'
import { container } from 'tsyringe'
import { TemplateController } from '../../controllers/template/template.controller'

const templateRouter = Router()

// Resolve the controller from the container
const templateController = container.resolve(TemplateController)

templateRouter.get('/all', (req, res, next) => templateController.queryTemplates(req, res, next))
templateRouter.post('/create', requireAuth, (req, res, next) => templateController.createTemplate(req, res, next))
templateRouter.patch('/update', requireAuth, (req, res, next) => templateController.updateTemplate(req, res, next))
templateRouter.delete('/delete/:id', requireAuth, (req, res, next) => templateController.deleteTemplate(req, res, next))

export { templateRouter }
