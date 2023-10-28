import { convert } from 'backend-helper-kit'

const data = [
    {
        schemaDirectory: './logic/validators/params',
        typeOutputDirectory: './logic/types/params'
    },
    {
        schemaDirectory: './logic/validators/returns',
        typeOutputDirectory: './logic/types/returns'
    }
]

convert(data)
