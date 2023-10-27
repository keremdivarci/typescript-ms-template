import { Router } from 'express'

import { SampleController } from '../controllers/sample'

import { requireAcces } from '../middlewares/access'

const sampleRouter = Router()

sampleRouter.get('/query', requireAcces(['sample', 'read']), SampleController.getSample)
sampleRouter.get('/query/all/', requireAcces(['sample', 'read', 'all']), SampleController.getSamples)
sampleRouter.post('/', requireAcces(['sample', 'create']), SampleController.createSample)
sampleRouter.put('/', requireAcces(['sample', 'update']), SampleController.updateSample)
sampleRouter.delete('/', requireAcces(['sample', 'delete']), SampleController.deleteSample)

export { sampleRouter }
