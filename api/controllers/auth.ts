import { getUserFromToken } from '../../logic/models/user'
import { ahandler } from 'backend-helper-kit'

import { login } from '../../logic/validators/params/user'
import { validate } from 'backend-helper-kit'

import { Response, Request } from 'express'

import { SessionError } from 'backend-helper-kit'

export class Auth {
    @ahandler
    static async login(req: Request, res: Response) {
        if (req.session.user) {
            throw new SessionError('User already logged in')
        }

        let user = getUserFromToken(req.body.token)

        validate(req.body, login)

        req.session.user = user

        return res.json({ result: true })
    }

    @ahandler
    static async logout(req: Request, res: Response) {
        if (!req.session.user) throw new SessionError('User not logged in')

        req.session.user = undefined

        return res.json({ result: true })
    }

    @ahandler
    static async check(req: Request, res: Response) {
        return res.json({ result: !!req.session.user })
    }
}
