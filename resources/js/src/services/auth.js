import { axios } from '../lib/axios';

export async function loginService(credentials) {
    const response = await axios.post('/api/v1/auth/login', credentials);
    return response.data;
}

export async function logoutService(accessToken) {
    const response = await axios.post('/api/v1/auth/logout', undefined, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    });
    return response.data;
}
