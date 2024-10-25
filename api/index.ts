import 'reflect-metadata'
import express, { json } from 'express'
import morgan from 'morgan'

import { config } from '../config'
import { createSession, headerConfig, documentateApi, errorHandler } from './middlewares'
import { addRoutes } from './routes'

export const app = express()

createSession(app)
app.use(morgan('dev'))
app.use(json({ limit: '10mb' }))

app.use(headerConfig)
addRoutes(app)
documentateApi(app)
app.use(errorHandler)

app.listen(config.PORT, () => console.log(`Server running! ✅`))
