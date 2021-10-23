import axios from 'axios';
import {KEYS, URLS} from "../constants/config";

const axiosInstance = axios.create({
    baseURL: URLS.axiosURL,
    headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        'x-happi-key': KEYS.API_KEY
    },
});

export default axiosInstance;