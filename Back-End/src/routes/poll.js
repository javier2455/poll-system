import { Router } from 'express'
import { PollController } from '../controllers/poll.js'
import { authRequired } from '../middlewares/validateToken.js'
import { getUserRole } from '../middlewares/getUserRole.js'

export const pollsRouter = Router()

pollsRouter.get('/', authRequired, PollController.getAll)
pollsRouter.post('/', authRequired, getUserRole, PollController.create)
pollsRouter.get('/:id', authRequired, getUserRole, PollController.getById)
pollsRouter.delete('/:id', authRequired, getUserRole, PollController.delete)
pollsRouter.put('/:id', authRequired, getUserRole, PollController.update)
pollsRouter.put(
  '/vote/:id/:inputId',
  authRequired,
  PollController.updatePollByVote
)
pollsRouter.put(
  '/close_poll/:id',
  authRequired,
  getUserRole,
  PollController.closePoll
)

// pollsRouter.get('/', authRequired, UserController.getAll)
// pollsRouter.post('/', authRequired, getUserRole, UserController.create)
// pollsRouter.get('/:id', authRequired, getUserRole, UserController.getById)
// pollsRouter.delete('/:id', authRequired, getUserRole, UserController.delete)
// pollsRouter.put('/:id', authRequired, getUserRole, UserController.update)
