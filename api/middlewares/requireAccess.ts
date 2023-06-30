import { hasAccess } from '../../logic/models/user'
import { ForbiddenError } from '../../errors/errors'

export default (access: string[]) => {
    return (req: any, res: any, next: any) => {
        //Check for session and user role
        if (!req?.session?.user) throw new ForbiddenError('User not logged in')

        hasAccess(access, req.session.user)

        return next()
    }
}
