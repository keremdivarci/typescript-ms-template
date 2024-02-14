import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Document } from 'mongoose'
import { id } from '../../logic/validators/common'

@modelOptions({
    schemaOptions: { collection: 'template', versionKey: false },
    options: { allowMixed: 0 }
})
export class Template extends Document {
    @prop({ required: true, unique: true })
    public name!: string

    @prop({ required: true })
    public records!: object[]

    @prop({ required: true })
    public createdBy!: string

    @prop({ required: true, default: false })
    isDeleted!: boolean

    @prop({ required: false })
    deletedAt?: Date

    @prop({ required: false })
    deletedBy?: typeof id
}

export const TemplateModel = getModelForClass(Template)
