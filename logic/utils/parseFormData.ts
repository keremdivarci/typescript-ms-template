import { Request } from 'express'
import { BadRequestError } from 'backend-helper-kit'
import formidable, { File, Fields, Files, Part } from 'formidable'

interface ParsedForm {
    fields: Fields
    files: Files
}

/**
 * Parses form data from the request object and extracts fields and files.
 * @param {Request} req - The Express request object containing form data.
 * @param {string[]} acceptedMimetypes - An array of accepted MIME types for file uploads.
 * @param {string[]} [preventArrayExtractionOn] - An optional array of field names whose values should not be automatically converted to arrays.
 * @returns {Promise<{ fields: Object.<string, string|string[]|object[]>|undefined, files: Object.<string, File>|undefined }>} A Promise resolving to an object containing extracted fields and files.
 * @throws {BadRequestError} Throws an error if the content type is not multipart/form-data or if a file type is not allowed.
 */
export async function parseFormData(req: Request, acceptedMimetypes: string[], preventArrayExtractionOn?: string[]) {
    if (!req.headers['content-type']?.includes('multipart/form-data')) {
        throw new BadRequestError('Content type is not multipart/form-data')
    }

    const form = formidable({ keepExtensions: true })

    const parsedForm: ParsedForm = await new Promise((resolve, reject) => {
        form.onPart = function (part: Part) {
            if (!part.originalFilename || checkMimetype(part.mimetype || '', acceptedMimetypes)) {
                this._handlePart(part)
            } else {
                return reject(new BadRequestError(`File type '${part.mimetype}' is not allowed for this operation`))
            }
        }

        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err)
                return
            }

            resolve({ fields, files })
        })
    })

    const extractedFields = fieldExtractor(parsedForm.fields, preventArrayExtractionOn ?? [])
    const extractedFiles = fileExtractor(parsedForm.files)

    return { fields: extractedFields, files: extractedFiles }
}

/**
 * Checks if a MIME type is included in the accepted MIME types.
 * @param {string} mimetype - The MIME type to check.
 * @param {string[]} acceptedMimetypes - An array of accepted MIME types.
 * @returns {boolean} True if the MIME type is accepted, otherwise false.
 */
function checkMimetype(mimetype: string, acceptedMimetypes: string[]): boolean {
    return !!mimetype && acceptedMimetypes.includes(mimetype)
}

/**
 * Extracts fields from an object containing string arrays and converts them into a structured format.
 * @param fields - The object containing fields as keys and string arrays as values.
 * @param preventExtraction - An array of field names to exclude an array with single value from extraction.
 * @returns {Object.<string, string|string[]|object[]|undefined>} An object containing extracted fields. If no fields are found, returns undefined.
 * @description This function extracts fields from the input object. Each field's value is converted into a string, an array of strings, or an array of objects.
 * If multiple objects are found in a single field, they are stored as an array of objects.
 * If a field is not included in the preventExtraction array and contains multiple strings separated by commas, it is converted into an array of strings.
 * If a field is a JSON object string, it is parsed into an object.
 * If a field is an array of arrays or an array of objects, it is handled accordingly.
 * If a field is an invalid JSON string, it is treated as a string.
 * preventExtraction is used to prevent extraction of fields that should be an array with a single value. Extractor still tries to parse the field as an array.
 * Example usage:
 * const fields = {
 *    field1: ['value1'],
 *    field2: ['{"test":"asd"}', '{"test":"asd"}'],
 *    field3: ['value3,value4,value5'],
 *    field4: ['[[1,2],[3,4],[5,6]]'],
 *    field5: ['{"test":"asd"},{"test":"asd"}']
 * };
 * const preventExtraction = ["field1"];
 * const extracted = fieldExtractor(fields, preventExtraction);
 * console.log(extracted);
 */
function fieldExtractor(fields: Fields, preventExtraction: string[]): { [key: string]: string | string[] | object | object[] } | undefined {
    if (Object.keys(fields).length === 0) {
        return undefined
    }
    let extractedFields: { [key: string]: string | string[] | object | object[] } = {}

    for (const field in fields) {
        const fieldValue = fields[field]
        if (fieldValue !== undefined) {
            const parsedFields = fieldValue.map((value) => {
                try {
                    const parsedValue = JSON.parse(`[${value}]`)
                    if (parsedValue.length === 1) {
                        return parsedValue[0]
                    } else {
                        return parsedValue
                    }
                } catch (error) {
                    return value // If parsing fails, return the original string
                }
            })

            /**
             * If any of the parsed values are objects, store them as an array of objects.
             * If only one value is found and preventExtraction flag isn't triggered, return it as a single string.
             * Otherwise, store the parsed objects as an array.
             */
            if (parsedFields.some((item) => typeof item === 'object' && item !== null)) {
                extractedFields[field] = parsedFields[0]
            } else if (parsedFields.length === 1 && !preventExtraction.includes(field)) {
                extractedFields[field] = parsedFields[0]
            } else {
                extractedFields[field] = parsedFields
            }
        }
    }
    return extractedFields
}

/**
 * Extracts the files from each field in the files object.
 * @param {Files} files - An object containing file data.
 * @returns {Object.<string, File>|undefined} An object containing extracted files, or undefined if no files are found.
 */
function fileExtractor(files: Files): { [key: string]: File } | undefined {
    if (Object.keys(files).length === 0) {
        return undefined
    }
    let extractedFiles: { [key: string]: File } = {}

    for (const file in files) {
        const extractedFile = files[file]
        if (extractedFile !== undefined) {
            if (extractedFile.length === 1) {
                extractedFiles[file] = extractedFile[0]
            } else {
                extractedFiles[file] = extractedFile[0]
            }
        }
    }
    return extractedFiles
}
