#!/usr/bin/env node
import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { GenerateEndpoint } from './GenerateEndpoint.js'
import { DestroyEndpoint } from './DestroyEndpoint.js'

const program = new Command()

program
    .version('1.0.0')
    .description('CLI for generating or destroying file components')
    .option('-a, --all', 'Generate all files')
    .option('-c, --components <components...>', 'Specify individual components to generate')
    .option('-d, --destroy', 'Destroy specified components or all files') // New option for destruction

program.parse()
const options = program.opts()

async function runCLI() {
    // Prompt for component name
    const { inputName } = await inquirer.prompt({
        type: 'input',
        name: 'inputName',
        message: 'Enter the name of the component:'
    })

    if (options['destroy']) {
        // Handle destruction logic
        const destroyer = new DestroyEndpoint(inputName)

        if (options['all']) {
            // Destroy all files associated with the input
            await destroyer.destroyFiles('all')
            console.log('All files destroyed successfully.')
        } else {
            let selectedComponents: string[] = options['components'] || []

            if (!options['components']) {
                // Prompt user for specific component selections if not provided in the options
                const { chosenComponents } = await inquirer.prompt({
                    type: 'checkbox',
                    name: 'chosenComponents',
                    message: `Choose components to ${chalk.red('DESTROY')}: `,
                    choices: destroyer.availableComponents
                })
                selectedComponents = chosenComponents
            }

            // Destroy only specified files
            for (const component of selectedComponents) {
                await destroyer.destroyFiles(component)
                console.log(`${component} destroyed successfully.`)
            }
        }
    } else {
        // Handle generation logic
        const generator = new GenerateEndpoint(inputName)

        if (options['all']) {
            // Generate all files with FileGenerator
            await generator.generateFiles('all')
            console.log('All files generated successfully.')
        } else {
            let selectedComponents: string[] = options['components'] || []

            if (!options['components']) {
                // Prompt user for specific component selections if not provided in the options
                const { chosenComponents } = await inquirer.prompt({
                    type: 'checkbox',
                    name: 'chosenComponents',
                    message: 'Choose components to generate:',
                    choices: generator.availableComponents
                })
                selectedComponents = chosenComponents
            }

            // Generate only specified files
            for (const component of selectedComponents) {
                await generator.generateFiles(component)
                console.log(`${component} generated successfully.`)
            }
        }
    }
}

runCLI().catch(console.error)
