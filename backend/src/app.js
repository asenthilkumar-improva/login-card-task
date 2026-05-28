import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import recordRoutes from './routes/recordRoutes.js'
import metaRoutes from './routes/metaRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { env } from './config/env.js'

const app = express()

app.use(cors({ origin: env.corsOrigin }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/records', recordRoutes)
app.use('/api/meta', metaRoutes)

app.use(errorHandler)

export default app
