import axios from 'axios';
import { BASE_URL } from '../config/env';
const API =axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
});
export default API;