import { SampleLogic } from '../../logic/models/sample'
import { ahandler, formatter } from 'backend-helper-kit'

import { Request, Response } from 'express'

import * as params from '../../logic/types/params/sample'

export class SampleController {
    @ahandler
    static async createSample(req: Request, res: Response) {
        res.json(
            formatter(
                await SampleLogic.createSample({
                    query: req.query,
                    body: req.body
                } as params.createSample)
            )
        )
    }

    @ahandler
    static async updateSample(req: Request, res: Response) {
        res.json(
            formatter(
                await SampleLogic.updateSample({
                    query: req.query,
                    body: req.body
                } as params.updateSample)
            )
        )
    }

    @ahandler
    static async deleteSample(req: Request, res: Response) {
        res.json(
            formatter(
                await SampleLogic.deleteSample({
                    query: req.query
                } as params.deleteSample)
            )
        )
    }

    @ahandler
    static async getSample(req: Request, res: Response) {
        res.json(
            formatter(
                await SampleLogic.getSample({
                    query: req.query
                } as params.getSample)
            )
        )
    }

    @ahandler
    static async getSamples(req: Request, res: Response) {
        res.json(
            formatter(
                await SampleLogic.getSamples({
                    query: req.query
                } as params.getSamples)
            )
        )
    }
}
