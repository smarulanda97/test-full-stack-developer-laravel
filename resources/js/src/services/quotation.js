import { axios } from '../lib/axios';
import { getPersistedAccessToken } from "../utils/persistance";

export async function generateQuotationService(quotation) {
    const response = await axios.post('/api/v1/quotations', quotation, {
        headers: {
            'Authorization': 'Bearer ' + getPersistedAccessToken(),
        }
    });
    return response.data;
}
