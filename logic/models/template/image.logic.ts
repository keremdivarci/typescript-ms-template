import { NotFoundError, validate, FileCorruptedError } from 'backend-helper-kit'
import fs from 'fs'
import { File } from 'formidable'

import { QueryTemplateImageInput, RemoveTemplateImageInput } from '../../types/template/input/image.input'
import { BaseOutput } from '../../types'
import { queryTemplateImage, removeTemplateImage, uploadTemplateImage } from '../../validators/template/input/image.input'

export class TemplatePhotoLogic {
    static async queryImage(params: QueryTemplateImageInput): Promise<BaseOutput> {
        const data = validate(params.params, queryTemplateImage)
        const imagePath = `./uploads/${data.id}.jpg`

        if (!fs.existsSync(imagePath)) {
            throw new NotFoundError('Template Image does not exist!')
        }

        return {
            result: imagePath
        }
    }

    static async uploadImage(params: any): Promise<BaseOutput> {
        const data = validate(params.body, uploadTemplateImage)
        const imagePath = `./uploads/${data.id}.jpg`

        const image = data.files.image as File
        fs.rename(image.filepath, imagePath, function (err) {
            if (err) throw new FileCorruptedError('Error while writing file to disk! Error:\n' + err)
        })

        return {
            result: true,
            message: 'Image has been uploaded'
        }
    }

    static async deleteImage(params: RemoveTemplateImageInput): Promise<BaseOutput> {
        const data = validate(params.params, removeTemplateImage)
        const imagePath = `./uploads/${data.id}.jpg`

        if (!fs.existsSync(imagePath)) {
            throw new NotFoundError('Template Image does not exist!')
        }

        fs.unlinkSync(imagePath)

        return {
            result: true,
            message: 'Image deleted'
        }
    }
}
