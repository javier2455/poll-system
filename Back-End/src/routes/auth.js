import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { authRequired } from '../middlewares/validateToken.js'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', AuthController.register)
authRouter.post('/logout', AuthController.logout)

authRouter.get('/profile', authRequired, AuthController.profile)
