import { PermissionLogic } from '../../../logic/models/user'

import { ahandler, formatter as wrapper } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

const formatter = wrapper(PermissionLogic)

export class PermissionController {
    @ahandler
    @formatter
    static async deletePermission(req: Request, res: Response, next: NextFunction): Promise<void> {}

    @ahandler
    @formatter
    static async getPermission(req: Request, res: Response, next: NextFunction): Promise<void> {}

    @ahandler
    @formatter
    static async addPermission(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
