import { Router } from 'express'
import { UserController } from '../controllers/user.js'
import { authRequired } from '../middlewares/validateToken.js'
import { getUserRole } from '../middlewares/getUserRole.js'

export const userRouter = Router()

userRouter.get('/', authRequired, getUserRole, UserController.getAll)
userRouter.post('/', authRequired, getUserRole, UserController.create)
userRouter.get('/:id', authRequired, getUserRole, UserController.getById)
userRouter.delete('/:id', authRequired, getUserRole, UserController.delete)
userRouter.put('/:id', authRequired, getUserRole, UserController.update)
