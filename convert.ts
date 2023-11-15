import { convert } from 'backend-helper-kit'

const data = [
    {
        schemaDirectory: './logic/validators/user',
        typeOutputDirectory: './logic/types/user'
    },
    {
        schemaDirectory: './logic/validators/user',
        typeOutputDirectory: './logic/types/user'
    }
]

convert(data)
