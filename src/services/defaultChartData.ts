import { AxiosResponse } from 'axios'
import axios from './axios'

export default async (): Promise<AxiosResponse> => {
    try {
        const res = await axios.get('/api/default_chart_data')
        return res
    } catch (e: any) {
        throw e.response.data.message
    }
}
