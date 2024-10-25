import { baseOutput, userSession } from '../../common'

export const login = baseOutput
    .keys({
        result: userSession.required()
    })
    .meta({ className: 'LoginOutput' })
