import { AxiosError } from 'axios'
import { BaseError, returnFormatter } from 'backend-helper-kit'
import { MongoServerError } from 'mongodb'

export function errorHandler(err: BaseError | Error | AxiosError, req: any, res: any, next: any) {
    if (err instanceof AxiosError) {
        res.status(err.response?.status || err.response?.data?.status || 500)
        res.json({
            api_error: err.response?.data || err.response?.statusText || err.message
        })
        return next()
    } else if (err instanceof MongoServerError) {
        res.status(400)
        if (err.code === 11000) {
            const duplicateKeys = Object.keys(err.keyValue)
            const errorMessage = `${duplicateKeys.join(', ')} field(s) is/are duplicated`
            res.json(returnFormatter(err, errorMessage, 'failed'))
        }
        return next()
    }

    const json = returnFormatter(err, 'Something went wrong', 'failed')

    if (!json.error!.status) {
        json.error!.status = 500
    }

    res.status(json.error!.status)
    delete json.error!.status
    res.json(json)

    next()
}
