import { default as axiosInstance } from 'axios';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

export const axios = axiosInstance.create(axiosConfig);
