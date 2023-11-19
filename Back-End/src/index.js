import express, { json } from 'express'
import morgan from 'morgan'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'
import { authRouter } from './routes/auth.js'
import { connectDB } from './db.js'

const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use(morgan('dev'))

// Router
app.use('/movies', moviesRouter)
app.use('/auth', authRouter)

// Connecting to DB
connectDB()
app.listen(4004)

console.log('Server on port 4004')
