import { Router } from 'express'
import { UserController } from '../controllers/user.js'
import { authRequired } from '../middlewares/validateToken.js'

export const userRouter = Router()

userRouter.get('/', authRequired, UserController.getAll)
userRouter.post('/', authRequired, UserController.create)
userRouter.get('/:id', authRequired, UserController.getById)
userRouter.delete('/:id', authRequired, UserController.delete)
userRouter.patch('/:id', authRequired, UserController.update)
