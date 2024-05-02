import JWT from 'jsonwebtoken'
import { config } from './config'

function encode(data: object, key: string, expiresIn = '1h') {
    return JWT.sign(data, key, { expiresIn })
}

console.log(
    encode(
        {
            id: '',
            email: '',
            name: ''
        },
        config.MODULE_KEY,
        '1h'
    )
)
