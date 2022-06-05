import { axios } from '../lib/axios';
import {getPersistedAccessToken} from "../utils/persistance";

export async function loginService(credentials) {
    const response = await axios.post('/api/v1/auth/login', credentials);
    return response.data;
}

export async function logoutService() {
    const response = await axios.post('/api/v1/auth/logout', undefined, {
        headers: {
            'Authorization': 'Bearer ' + getPersistedAccessToken(),
        }
    });
    return response.data;
}
