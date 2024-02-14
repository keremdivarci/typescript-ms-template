import { Router } from 'express'
import { requireAuth } from '../../middlewares'

//Require controllers
import { TemplateImageController } from '../../controllers/template/image.controller'

const templateImageRouter = Router()

//Routes
templateImageRouter.get('/:id', TemplateImageController.queryImage)
templateImageRouter.post('/upload', requireAuth, TemplateImageController.uploadImage)
templateImageRouter.delete('/delete/:id', requireAuth, TemplateImageController.deleteImage)

export { templateImageRouter }
