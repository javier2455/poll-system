import { Router } from 'express'
import { login, register, logout, profile } from '../controllers/auth.js'
import { authRequired } from '../middlewares/validateToken.js'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.post('/logout', logout)

authRouter.get('/profile', authRequired, profile)
