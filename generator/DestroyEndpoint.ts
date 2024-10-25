import * as fs from 'fs'
import * as path from 'path'
import { Base } from './base.js'

//**Evil Twin of GenerateEndpoint */
export class DestroyEndpoint extends Base {
    constructor(input: string) {
        super(input)
    }

    public async destroyFiles(option: string): Promise<void> {
        switch (option) {
            case 'database':
                const databaseFilePath = path.join(this.projectRoot, 'database/models', `${this.input}.ts`)
                this.deleteFile(databaseFilePath)
                break
            case 'routes':
                const routesFilePath = path.join(this.projectRoot, 'api/routes', this.input, `${this.input}.routes.ts`)
                this.deleteFile(routesFilePath)
                break
            case 'controller':
                const controllerFilePath = path.join(this.projectRoot, 'api/controllers', this.input, `${this.input}.controller.ts`)
                this.deleteFile(controllerFilePath)
                break
            case 'service':
                const serviceFilePath = path.join(this.projectRoot, 'services', `${this.input}.service.ts`)
                this.deleteFile(serviceFilePath)
                break
            case 'logic':
                const logicFilePath = path.join(this.projectRoot, 'logic/models', this.input, `${this.input}.logic.ts`)
                this.deleteFile(logicFilePath)
                const logicIndexFilePath = path.join(this.projectRoot, 'logic/models', this.input, 'index.ts')
                this.deleteFile(logicIndexFilePath)
                break
            case 'validator':
                const validatorInputFilePath = path.join(this.projectRoot, 'logic/validators', this.input, 'input', `${this.input}.input.ts`)
                this.deleteFile(validatorInputFilePath)
                const validatorSchemasFilePath = path.join(this.projectRoot, 'logic/validators', this.input, `${this.input}.schemas.ts`)
                this.deleteFile(validatorSchemasFilePath)
                break
            case 'all':
                // Delete all components associated with the input
                this.destroyFiles('database')
                this.destroyFiles('routes')
                this.destroyFiles('controller')
                this.destroyFiles('service')
                this.destroyFiles('logic')
                this.destroyFiles('validator')
                this.deleteDirectory(path.join(this.projectRoot, 'api/routes', this.input))
                this.deleteDirectory(path.join(this.projectRoot, 'api/controllers', this.input))
                this.deleteDirectory(path.join(this.projectRoot, 'logic/validators', this.input))
                break
            default:
                console.log('Invalid option selected.')
        }
    }

    protected deleteFile(filePath: string): void {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            console.log(`Deleted file: ${filePath}`)
        } else {
            console.log(`File not found: ${filePath}`)
        }
    }

    protected deleteDirectory(dirPath: string): void {
        if (fs.existsSync(dirPath)) {
            fs.rmSync(dirPath, { recursive: true, force: true })
            console.log(`Deleted directory: ${dirPath}`)
        } else {
            console.log(`Directory not found: ${dirPath}`)
        }
    }
}
