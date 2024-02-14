import { NotFoundError, validate, FileCorruptedError } from 'backend-helper-kit'
import fs from 'fs'

import * as inputTypes from '../../types/template/input/image.input'
//import * as outputTypes from '../../types/template/output/image.output'
import * as validationTypes from '../../types/template/common'

import * as validators from '../../validators/template/common'
import { File } from 'formidable'

export class TemplatePhotoLogic {
    static async queryImage(params: inputTypes.queryTemplateImage): Promise<validationTypes.baseOutput> {
        const data = validate(params.params, validators.queryImageData) as validationTypes.queryImageData
        const imagePath = `./uploads/${data.id}.jpg`

        if (!fs.existsSync(imagePath)) {
            throw new NotFoundError('Template Image does not exist!')
        }

        return {
            result: imagePath
        }
    }

    static async uploadImage(params: any): Promise<validationTypes.baseOutput> {
        const data = validate(params.body, validators.uploadImageData) as validationTypes.uploadImageData
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

    static async deleteImage(params: inputTypes.removeTemplateImage): Promise<validationTypes.baseOutput> {
        const data = validate(params.params, validators.removeImageData) as validationTypes.removeImageData
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
