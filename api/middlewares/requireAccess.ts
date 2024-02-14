import { ForbiddenError } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

export function requireAccess(access: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.session?.user) throw new ForbiddenError('User not logged in') //Check for session

        //Check for access

        return next()
    }
}
