import { SessionAxios } from './axiosSession'
import { variables as config } from '../../config'

export class Sample {
    public axios: SessionAxios

    constructor() {
        this.axios = new SessionAxios({
            baseURL: config.SAMPLE_MS
        })
    }

    async login(): Promise<boolean> {
        const response = await this.axios.request({
            url: '/login',
            method: 'POST',
            data: {
                name: config.MODULE_NAME,
                key: config.MODULE_KEY
            }
        })

        return response.data.result as boolean
    }

    async logout(): Promise<boolean> {
        const response = await this.axios.request({
            url: '/logout',
            method: 'POST'
        })

        return response.data.result as boolean
    }

    async check(): Promise<boolean> {
        const response = await this.axios.request({
            url: '/check',
            method: 'GET'
        })

        return response.data.result as boolean
    }

    async sampleLogic(): Promise<any> {
        const response = await this.axios.request({
            url: '/sample',
            method: 'GET'
        })

        return response.data.result
    }
}
