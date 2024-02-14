import Mongoose, { connection } from 'mongoose'
import { config } from '../config'

Mongoose.connect(config.MONGO_CONNECTION)
    .then(() => {
        console.log(`Connected to the => ${config.MONGO_CONNECTION}`)
    })
    .catch((err) => {
        console.log(`Could not connect to the => ${config.MONGO_CONNECTION}`)
        console.log('Error: ', err)
    })

export { connection }
