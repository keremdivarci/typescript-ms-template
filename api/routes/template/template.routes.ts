import { Router } from 'express'
import { requireAuth /*requireAccess*/ } from '../../middlewares'

//Require controllers
import { TemplateController } from '../../controllers/template/template.controller'

const templateRouter = Router()

//Routes
templateRouter.get('/all', TemplateController.queryTemplates)
templateRouter.post('/create', requireAuth, TemplateController.createTemplate)
templateRouter.patch('/update', requireAuth, TemplateController.updateTemplate)
templateRouter.delete('/delete/:id', requireAuth, TemplateController.deleteTemplate)

export { templateRouter }
