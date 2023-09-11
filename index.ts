import { connection } from './database'
import { app } from './api'
import { variables as config } from './config'

export { connection, app }

console.log(config)
