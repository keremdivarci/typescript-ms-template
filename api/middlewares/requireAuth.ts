import { ValidationError, ForbiddenError } from 'backend-helper-kit'

export function requireAuth(req: any, res: any, next: any) {
    try {
        if (!req?.session?.user || new Date(req?.session?.cookie?._expires) < new Date()) return next(new ForbiddenError('Access Denied'))

        return next()
    } catch (error) {
        if (error instanceof ValidationError) {
            req.session.user = undefined
        }

        next(error)
    }
}
