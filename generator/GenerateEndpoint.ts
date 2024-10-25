import * as fs from 'fs'
import * as path from 'path'
import { Base } from './base.js'

export class GenerateEndpoint extends Base {
    constructor(input: string) {
        super(input)
    }

    // CLI method to generate files based on selected options
    public async generateFiles(option: string): Promise<void> {
        switch (option) {
            case 'database':
                this.generateDatabaseModel()
                break
            case 'routes':
                this.generateRoutes()
                break
            case 'controller':
                this.generateController()
                break
            case 'service':
                this.generateService()
                break
            case 'logic':
                this.generateLogic()
                this.generateLogicIndex()
                break
            case 'validator':
                this.generateValidatorInput()
                this.generateValidatorSchemas()
                break
            case 'all':
                this.generateDatabaseModel()
                this.generateRoutes()
                this.generateController()
                this.generateService()
                this.generateLogic()
                this.generateLogicIndex()
                this.generateValidatorInput()
                this.generateValidatorSchemas()
                break
            default:
                console.log('Invalid option selected.')
        }
    }

    private capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    private generateDatabaseModel(): void {
        const content = this.getDatabaseContent()
        const filePath = path.join(this.projectRoot, 'database/models', `${this.input}.ts`)
        this.createFile(filePath, content)
    }

    private generateRoutes(): void {
        const content = this.getRoutesContent()
        const filePath = path.join(this.projectRoot, 'api/routes', this.input, `${this.input}.routes.ts`)
        this.createFile(filePath, content)
    }

    private generateController(): void {
        const content = this.getControllerContent()
        const filePath = path.join(this.projectRoot, 'api/controllers', this.input, `${this.input}.controller.ts`)
        this.createFile(filePath, content)
    }

    private generateService(): void {
        const content = this.getServiceContent()
        const filePath = path.join(this.projectRoot, 'services', `${this.input}.service.ts`)
        this.createFile(filePath, content)
    }

    private generateLogic(): void {
        const content = this.getLogicContent()
        const filePath = path.join(this.projectRoot, 'logic/models', this.input, `${this.input}.logic.ts`)
        this.createFile(filePath, content)
    }

    private generateLogicIndex(): void {
        const content = this.getLogicIndexContent()
        const filePath = path.join(this.projectRoot, 'logic/models', this.input, 'index.ts')
        this.createFile(filePath, content)
    }

    private generateValidatorInput(): void {
        const content = this.getValidatorInputContent()
        const filePath = path.join(this.projectRoot, 'logic/validators', this.input, 'input', `${this.input}.input.ts`)
        this.createFile(filePath, content)
    }

    private generateValidatorSchemas(): void {
        const content = this.getValidatorLogicContent()
        const filePath = path.join(this.projectRoot, 'logic/validators', this.input, `${this.input}.schemas.ts`)
        this.createFile(filePath, content)
    }

    // Method to create or overwrite a file with content
    private createFile(filePath: string, content: string): void {
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
        fs.writeFileSync(filePath, content, 'utf8')
        console.log(`Created component at: ${filePath}`)
    }

    private getDatabaseContent(): string {
        return `import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Document } from 'mongoose'
import { id } from '../../logic/validators/common'

@modelOptions({
    schemaOptions: { collection: 'template', versionKey: false },
    options: { allowMixed: 0 }
})
export class ${this.capitalizeFirstLetter(this.input)} extends Document {
    @prop({ required: true })
    public createdBy!: string

    @prop({ required: true, default: false })
    isDeleted!: boolean

    @prop({ required: false })
    deletedAt?: Date

    @prop({ required: false })
    deletedBy?: typeof id
}

export const ${this.capitalizeFirstLetter(this.input)}Model = getModelForClass(${this.capitalizeFirstLetter(this.input)})

`
    }
    private getRoutesContent(): string {
        return `
import { Router } from 'express'
import { requireAuth } from '../../middlewares'
import { container } from 'tsyringe'
import { ${this.capitalizeFirstLetter(this.input)}Controller } from '../../controllers/${this.input}/${this.input}.controller'

const ${this.input}Router = Router()

// Resolve the controller from the container
const ${this.input}Controller = container.resolve(${this.capitalizeFirstLetter(this.input)}Controller)

${this.input}Router.get('/all', (req, res, next) => ${this.input}Controller.query${this.capitalizeFirstLetter(this.input)}s(req, res, next))
${this.input}Router.post('/create', requireAuth, (req, res, next) => ${this.input}Controller.create${this.capitalizeFirstLetter(
            this.input
        )}(req, res, next))
${this.input}Router.patch('/update', requireAuth, (req, res, next) => ${this.input}Controller.update${this.capitalizeFirstLetter(
            this.input
        )}(req, res, next))
${this.input}Router.delete('/delete/:id', requireAuth, (req, res, next) => ${this.input}Controller.delete${this.capitalizeFirstLetter(
            this.input
        )}(req, res, next))

export { ${this.input}Router }
`
    }
    private getControllerContent(): string {
        return `
import { Request, Response, NextFunction } from 'express'
import { inject, Lifecycle, scoped } from 'tsyringe'
import { ahandler as async_handler } from 'backend-helper-kit'
import { ${this.capitalizeFirstLetter(this.input)}Service } from '../../../services/${this.input}.service'

@scoped(Lifecycle.ContainerScoped)
export class ${this.capitalizeFirstLetter(this.input)}Controller {
    constructor(@inject(${this.capitalizeFirstLetter(this.input)}Service) private ${this.input}Service: ${this.capitalizeFirstLetter(
            this.input
        )}Service) {}

    @async_handler
    async query${this.capitalizeFirstLetter(this.input)}s(req: Request, res: Response, next: NextFunction) {
        const result = await this.${this.input}Service.query${this.capitalizeFirstLetter(this.input)}s(req.query)
        res.json(result)
    }
    @async_handler
    async create${this.capitalizeFirstLetter(this.input)}(req: Request, res: Response, next: NextFunction) {
        const result = await this.${this.input}Service.create${this.capitalizeFirstLetter(this.input)}(req)
        res.json(result)
    }
    @async_handler
    async update${this.capitalizeFirstLetter(this.input)}(req: Request, res: Response, next: NextFunction) {
        const result = await this.${this.input}Service.update${this.capitalizeFirstLetter(this.input)}(req)
        res.json(result)
    }
    @async_handler
    async delete${this.capitalizeFirstLetter(this.input)}(req: Request, res: Response, next: NextFunction) {
        const result = await this.${this.input}Service.delete${this.capitalizeFirstLetter(this.input)}(req.params.id)
        res.json(result)
    }
}
`
    }
    private getServiceContent(): string {
        return `
import { injectable } from 'tsyringe'
import { parseFormData } from '../utils/parseFormData'

import { ${this.capitalizeFirstLetter(this.input)}Logic } from '../logic/models/${this.input}'
import { Create${this.capitalizeFirstLetter(this.input)}Schema, Update${this.capitalizeFirstLetter(this.input)}Schema } from '../logic/types/${
            this.input
        }'

@injectable()
export class ${this.capitalizeFirstLetter(this.input)}Service {
    async query${this.capitalizeFirstLetter(this.input)}s(query: any) {
        return await ${this.capitalizeFirstLetter(this.input)}Logic.query${this.capitalizeFirstLetter(this.input)}s({ query })
    }

    async create${this.capitalizeFirstLetter(this.input)}(req: any) {
        const data = await parseFormData(req, ['image/png', 'image/jpg', 'image/jpeg'], ['records'])
        return await ${this.capitalizeFirstLetter(this.input)}Logic.create${this.capitalizeFirstLetter(this.input)}({
            body: { ...data.fields, files: data.files } as Create${this.capitalizeFirstLetter(this.input)}Schema,
            user: req.session.user
        })
    }

    async update${this.capitalizeFirstLetter(this.input)}(req: any) {
        const data = await parseFormData(req, ['image/png', 'image/jpg', 'image/jpeg'], ['records'])
        return await ${this.capitalizeFirstLetter(this.input)}Logic.update${this.capitalizeFirstLetter(this.input)}({
            body: { ...data.fields, files: data.files } as Update${this.capitalizeFirstLetter(this.input)}Schema,
            user: req.session.user
        })
    }

    async delete${this.capitalizeFirstLetter(this.input)}(id: string) {
        return await ${this.capitalizeFirstLetter(this.input)}Logic.delete${this.capitalizeFirstLetter(this.input)}({ query: { id } })
    }
}
`
    }
    private getLogicContent(): string {
        return `
import { ${this.capitalizeFirstLetter(this.input)}Model } from '../../../database/models/${this.input}'
import { ErrorHelper } from 'backend-helper-kit'

import { filterQuerySize, defaultProjection, asyncValidator } from '../../../helpers'
import { saveFile } from '../../../utils/saveFile'

import * as inputTypes from '../../validators/${this.input}/input/${this.input}.input'
import { Create${this.capitalizeFirstLetter(this.input)}Input, Query${this.capitalizeFirstLetter(
            this.input
        )}sInput, Remove${this.capitalizeFirstLetter(this.input)}Input, Update${this.capitalizeFirstLetter(this.input)}Input } from '../../types/${
            this.input
        }/input/${this.input}.input'
import { BaseOutput } from '../../types/common'
import { config } from '../../../config'

const errorHelper = new ErrorHelper(__filename)

@asyncValidator(config, inputTypes)
export class ${this.capitalizeFirstLetter(this.input)}Logic {
    static async query${this.capitalizeFirstLetter(this.input)}s(params: Query${this.capitalizeFirstLetter(this.input)}sInput): Promise<BaseOutput> {
        const data = params.query
        let result
        if (data.pageSize === -1) {
            result = await ${this.capitalizeFirstLetter(
                this.input
            )}Model.find({ isDeleted: false }).sort({ _id: -1 }).select(defaultProjection).lean().exec()
        } else {
            const skip = filterQuerySize(data.page ?? 5, data.pageSize ?? 1)
            result = await ${this.capitalizeFirstLetter(this.input)}Model.find({ isDeleted: false })
                .sort({ _id: -1 })
                .select(defaultProjection)
                .skip(skip)
                .limit(data.pageSize || 5)
        }

        errorHelper.getAllError({ result, text: 'No ${this.input} record found in database!' })
        return { result }
    }

    static async create${this.capitalizeFirstLetter(this.input)}(params: Create${this.capitalizeFirstLetter(this.input)}Input): Promise<BaseOutput> {
        const data = params.body

        const ${this.input} = new ${this.capitalizeFirstLetter(this.input)}Model() // Create new instance
        const fileSaved = await saveFile(data.files as any, String(${this.input}._id), 'uploads', 1) // Save file to disk
        if (!fileSaved) return { result: false, message: 'File could not be saved!' }
        ${this.input}.set({ ...data, createdBy: params.user.id }) // Set data to instance
        const result = await ${this.input}.save() // Save instance to database

        errorHelper.createError({ result })

        return { result: !!result, message: result ? '${this.capitalizeFirstLetter(this.input)} has been created successfully!' : undefined }
    }

    static async update${this.capitalizeFirstLetter(this.input)}(params: Update${this.capitalizeFirstLetter(this.input)}Input): Promise<BaseOutput> {
        const data = params.body
        if (data.files) {
            await saveFile(data.files, data.id, 'uploads', 1)
        }

        const result = await ${this.capitalizeFirstLetter(this.input)}Model.updateOne({ _id: data.id }, data)
        errorHelper.updateError({ result })
        return { result: result.modifiedCount > 0, message: result.modifiedCount > 0 ? '${this.capitalizeFirstLetter(
            this.input
        )} updated successfully!' : undefined }
    }

    static async delete${this.capitalizeFirstLetter(this.input)}(params: Remove${this.capitalizeFirstLetter(this.input)}Input): Promise<BaseOutput> {
        const data = params.query
        const result = await ${this.capitalizeFirstLetter(this.input)}Model.findByIdAndUpdate(data.id, { isDeleted: true })

        errorHelper.deleteError({ result })

        return { result: !!result, message: result ? '${this.capitalizeFirstLetter(this.input)} has been deleted successfully!' : undefined }
    }
}
`
    }
    private getLogicIndexContent(): string {
        return `export { ${this.capitalizeFirstLetter(this.input)}Logic } from './${this.input}.logic'`
    }
    private getValidatorInputContent(): string {
        return `import Joi from 'joi'
import { query${this.capitalizeFirstLetter(this.input)}sSchema, create${this.capitalizeFirstLetter(
            this.input
        )}Schema, update${this.capitalizeFirstLetter(this.input)}Schema } from '../${this.input}.schemas'
import { baseIdInput, baseInput, userSession } from '../../common'

export const query${this.capitalizeFirstLetter(this.input)}s = baseInput
    .keys({
        user: userSession.optional(),
        body: Joi.forbidden(),
        query: query${this.capitalizeFirstLetter(this.input)}sSchema.required()
    })
    .meta({ className: 'Query${this.capitalizeFirstLetter(this.input)}sInput' })

export const create${this.capitalizeFirstLetter(this.input)} = baseInput
    .keys({
        user: userSession.required(),
        body: create${this.capitalizeFirstLetter(this.input)}Schema.required()
    })
    .meta({ className: 'Create${this.capitalizeFirstLetter(this.input)}Input' })

export const update${this.capitalizeFirstLetter(this.input)} = baseInput
    .keys({
        body: update${this.capitalizeFirstLetter(this.input)}Schema.required()
    })
    .meta({ className: 'Update${this.capitalizeFirstLetter(this.input)}Input' })

export const remove${this.capitalizeFirstLetter(this.input)} = baseInput
    .keys({
        body: Joi.forbidden(),
        query: baseIdInput.required()
    })
    .meta({ className: 'Remove${this.capitalizeFirstLetter(this.input)}Input' })
`
    }
    private getValidatorLogicContent(): string {
        return `import Joi from 'joi'
import { baseIdInput, objectId } from '../common'
import j2s from 'joi-to-swagger'

//* ${this.capitalizeFirstLetter(this.input)} CRUD Schemas
export const query${this.capitalizeFirstLetter(this.input)}sSchema = Joi.object({
    page: Joi.number().default(1),
    pageSize: Joi.number().default(5)
}).meta({ className: 'Query${this.capitalizeFirstLetter(this.input)}sSchema' })

export const create${this.capitalizeFirstLetter(this.input)}Schema = Joi.object({
    files: Joi.any().meta({ swaggerType: 'file' }).required(),
    name: Joi.string().required(),
    records: Joi.array().items(Joi.object().required()).required()
}).meta({ className: 'Create${this.capitalizeFirstLetter(this.input)}Schema' })

export const update${this.capitalizeFirstLetter(this.input)}Schema = Joi.object({
    files: Joi.any().meta({ swaggerType: 'file' }),
    id: objectId.required(),
    name: Joi.string(),
    records: Joi.array()
}).meta({ className: 'Update${this.capitalizeFirstLetter(this.input)}Schema' })

//* ${this.capitalizeFirstLetter(this.input)} Image CRUD Schemas
export const queryImageSchema = baseIdInput.meta({ className: 'QueryImageSchema' })

export const uploadImageSchema = Joi.object({
    files: Joi.any().required(),
    id: objectId.required()
}).meta({ className: 'UploadImageSchema' })

//* Swagger
export const query${this.capitalizeFirstLetter(this.input)}Swagger = j2s(query${this.capitalizeFirstLetter(this.input)}sSchema).swagger
export const create${this.capitalizeFirstLetter(this.input)}Swagger = j2s(create${this.capitalizeFirstLetter(this.input)}Schema).swagger
export const update${this.capitalizeFirstLetter(this.input)}Swagger = j2s(update${this.capitalizeFirstLetter(this.input)}Schema).swagger

export const queryImageSwagger = j2s(queryImageSchema).swagger
export const uploadImageSwagger = j2s(uploadImageSchema).swagger
`
    }
}
