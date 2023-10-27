import { Router } from 'express'

//Require controllers
import { Auth } from '../controllers/auth'
//Initilaziation
const authRouter = Router()

//Routes
authRouter.get('/check', Auth.check)
authRouter.post('/login', Auth.login)
authRouter.get('/logout', Auth.logout)

export { authRouter }
