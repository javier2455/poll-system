import express, { json } from 'express'
import morgan from 'morgan'
import cokkieParser from 'cookie-parser'
import { corsMiddleware } from './utils/cors.js'
import { authRouter } from './routes/auth.js'
import { userRouter } from './routes/user.js'
import { pollsRouter } from './routes/poll.js'
import { connectDB } from './db.js'

const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use(morgan('dev'))
app.use(cokkieParser())

// Router
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/polls', pollsRouter)

// Connecting to DB
connectDB()
app.listen(4004)

console.log('Server on port 4004')
