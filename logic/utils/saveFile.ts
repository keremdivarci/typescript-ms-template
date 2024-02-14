import fs from 'fs'
import path from 'path'
import { File } from 'formidable'
import { BadRequestError, FileCorruptedError } from 'backend-helper-kit'

export async function saveFile(files: { [key: string]: File }, filename: string, savePath: string, acceptedCount: number = 1) {
    const filesArray = Object.values(files)

    if (filesArray.length !== acceptedCount) {
        throw new BadRequestError(`File count is not equal to ${acceptedCount}`)
    }

    for (const file of filesArray) {
        if (file !== undefined && file.originalFilename !== null) {
            const fileExtension = path.extname(file.originalFilename) // Extract file extension from original filename
            const newPath = path.join(savePath, `${filename}${fileExtension}`)

            fs.rename(file.filepath, newPath, function (err) {
                if (err) {
                    throw new FileCorruptedError(`Error while writing file to disk! Error:\n${err}`)
                }
            })
        } else {
            throw new BadRequestError('File not found')
        }
    }
    return true
}
