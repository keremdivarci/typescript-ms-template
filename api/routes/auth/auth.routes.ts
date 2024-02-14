import { Router } from 'express'
import { requireAuth } from '../../middlewares'

//Require controllers
import { AuthController } from '../../controllers/auth/auth.controller'

const authRouter = Router()

//Routes
authRouter.get('/check', AuthController.check)
authRouter.post('/login', AuthController.login)
authRouter.delete('/logout', requireAuth, AuthController.logout)

export { authRouter }
