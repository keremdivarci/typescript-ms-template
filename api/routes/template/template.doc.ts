import { TemplateModel } from '../../../database/models/template'
import { createTemplateSchema, updateTemplateSchema } from '../../../logic/validators/template/template.schemas'
//import { queryImageSchema, uploadImageSchema, removeImageSchema } from '../../../logic/validators/template/common'

//Swagger Definitions
const swQueryTemplate = {
    summary: 'Queries templates',
    tags: ['template - fetch data'],
    parameters: [
        {
            in: 'query',
            name: 'page',
            type: 'number',
            description:
                'Page number, skips query results depending on pageSize variable.\n\n It returns first page if not given. \n\nExample: If pageSize is 5 and page is 1, query will return 5 latest records from database. If page is 2 and pageaSize is 5 it will skip latest 5 document from database and will return latest 6th to 10th results.'
        },
        {
            in: 'query',
            name: 'pageSize',
            type: 'number',
            description: 'Number of events to return, returns 5 events if not given\n\n To return all events, set pageSize to -1'
        }
    ],
    responses: {
        '200': {
            description: 'Array of all templates',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            example: new TemplateModel({
                                name: 'Template 1',
                                records: [{ name: 'Record 1', value: 'Value 1' }],
                                createdBy: 'user1'
                            })
                        }
                    }
                }
            }
        }
    }
}

const swCreateTemplate = {
    summary: 'Creates a new template',
    tags: ['template - send data'],
    requestBody: {
        content: {
            'multipart/form-data': {
                schema: {
                    ...createTemplateSchema
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'OK'
        },
        default: {
            description: 'Error message'
        }
    }
}

const swUpdateTemplate = {
    summary: 'Updates template with given id',
    tags: ['template - send data'],
    requestBody: {
        content: {
            'multipart/form-data': {
                schema: {
                    ...updateTemplateSchema
                }
            }
        }
    },
    responses: {
        '200': {
            description: 'OK'
        },
        default: {
            description: 'Error message'
        }
    }
}

const swRemoveTemplate = {
    summary: 'Removes a template',
    tags: ['template - send data'],
    parameters: [
        {
            in: 'path',
            name: 'id',
            type: 'string',
            description: 'Template id',
            required: true
        }
    ],
    responses: {
        '200': {
            description: 'OK'
        },
        default: {
            description: 'Error message'
        }
    }
}

//Swagger Router
const swTemplateRouter = {
    '/template/all': {
        get: {
            ...swQueryTemplate
        }
    },
    '/template/create': {
        post: {
            ...swCreateTemplate
        }
    },
    '/template/update': {
        patch: {
            ...swUpdateTemplate
        }
    },
    '/template/delete/{id}': {
        delete: {
            ...swRemoveTemplate
        }
    }
}

export { swTemplateRouter }
