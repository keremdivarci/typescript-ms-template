import { variables as config } from './config'
import { convert } from 'backend-helper-kit'

import data from './type.json'

data as {
    schemaDirectory: string
    typeOutputDirectory: string
}[]

if (config.ENV === 'development') {
    convert(data)
}

import { connection } from './database'
import { app } from './api'

export { connection, app }
