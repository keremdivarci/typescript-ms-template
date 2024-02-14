import { AuthLogic } from '../../../logic/models/auth'

import { ahandler, SessionError, returnFormatter } from 'backend-helper-kit'

import { Response, Request, NextFunction } from 'express'

export class AuthController {
    @ahandler
    static async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        if (req.session.user) throw new SessionError('User already logged in')

        req.session.user = (await AuthLogic.login({ body: req.body })).result
        return res.json(returnFormatter(!!req.session.user))
    }

    @ahandler
    static async logout(req: Request, res: Response): Promise<any> {
        if (!req.session.user) throw new SessionError('User not logged in')

        req.session.destroy((err: Error): void => {
            if (err) {
                throw err
            }
        })

        res.json(returnFormatter(!req.session?.user))
    }

    @ahandler
    static async check(req: Request, res: Response): Promise<Response> {
        return res.json(returnFormatter(!!req.session.user))
    }
}
