import { Router } from 'express'

import { SampleController } from '../controllers/sample'

const router = Router()

router.post('/query', SampleController.querySample)
router.post('/query/all/', SampleController.querySamples)
router.post('/', SampleController.createSample)
router.put('/', SampleController.updateSample)
router.delete('/', SampleController.deleteSample)

export { router }
