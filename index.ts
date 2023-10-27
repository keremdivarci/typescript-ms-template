import { variables as config } from './config'
console.log(config)

import { convert } from 'backend-helper-kit'

if (config.ENV === 'development') {
    convert([
        {
            schemaDirectory: './logic/validators/params',
            typeOutputDirectory: './logic/types/params'
        },
        {
            schemaDirectory: './logic/validators/returns',
            typeOutputDirectory: './logic/types/returns'
        }
    ])
}

import { connection } from './database'
import { app } from './api'

export { connection, app }
