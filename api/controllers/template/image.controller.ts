import { TemplatePhotoLogic } from '../../../logic/models/template'
import { ahandler as async_handler, returnFormatter } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'
import { UserSession } from '../../../logic/types/common'

import { parseFormData } from '../../../utils/parseFormData'

export class TemplateImageController {
    @async_handler
    static async queryImage(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as string
        return res.sendFile((await TemplatePhotoLogic.queryImage({ params: { id } })).result, { root: '.' })
    }

    @async_handler
    static async uploadImage(req: Request, res: Response, next: NextFunction) {
        const acceptedMimetypes = ['image/png', 'image/jpg', 'image/jpeg']
        const data = await parseFormData(req, acceptedMimetypes)
        const result = await TemplatePhotoLogic.uploadImage({
            body: { fields: data.fields, files: data.files } as { fields: any; files: any } /*Modify this line to match the type of the body*/,
            user: req.session.user as UserSession
        })
        return res.json(returnFormatter(result))
    }

    @async_handler
    static async deleteImage(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id as string
        const result = await TemplatePhotoLogic.deleteImage({ params: { id }, user: req.session.user as UserSession })
        return res.json(returnFormatter(result))
    }
}
