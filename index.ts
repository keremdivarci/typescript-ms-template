import { variables as config } from './config'
console.log(config)

import { convert } from 'backend-helper-kit'

if (config.ENV === 'development') {
    convert()
}

import { connection } from './database'
import { app } from './api'

export { connection, app }
