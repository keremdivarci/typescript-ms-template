import { Router } from 'express'
import { PermissionController } from '../../controllers/user/permission'

export const permissionRouter = Router()

//Routes
permissionRouter.delete('/', PermissionController.deletePermission)
permissionRouter.get('/', PermissionController.getPermissions)
permissionRouter.post('/', PermissionController.addPermission)
