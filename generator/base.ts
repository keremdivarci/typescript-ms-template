import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export abstract class Base {
    protected projectRoot = resolve(__dirname, '..')
    protected input: string
    public availableComponents = ['database', 'routes', 'controller', 'service', 'logic', 'validator']

    constructor(input: string) {
        this.input = input
    }
}
