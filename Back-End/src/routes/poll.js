import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'

export const pollsRouter = Router()

pollsRouter.get('/', authRequired, (req, res) => {
  res.send('Polls')
})
