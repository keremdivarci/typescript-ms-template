import express, { json } from 'express'
import morgan from 'morgan'

import { config } from '../config'
import { createSession, headerConfig, documentateApi, errorHandler } from './middlewares'
import { addRoutes } from './routes'

export const app = express()

createSession(app) // create session
app.use(morgan('dev')) // logging
app.use(json({ limit: '10mb' })) // parse json

app.use(headerConfig) // set headers

addRoutes(app) // add routes

documentateApi(app) //create documentation

app.use(errorHandler) // handle errors

app.listen(config.PORT, () => console.log(`Server running! ✅`))
