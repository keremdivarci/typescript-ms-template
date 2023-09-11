import { convertFromDirectory } from 'joi-to-typescript'
convertFromDirectory({
    schemaDirectory: './logic/validators/returns',
    typeOutputDirectory: './logic/types/returns'
})

convertFromDirectory({
    schemaDirectory: './logic/validators/params',
    typeOutputDirectory: './logic/types/params'
})
