import axios from 'axios'
import { WEB_BASE } from '../APIBase'

const axiosInstance = axios.create({
  baseURL: WEB_BASE,
  // baseURL: '/api',
  headers: {
    'x-api-key': 987655,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export default axiosInstance
