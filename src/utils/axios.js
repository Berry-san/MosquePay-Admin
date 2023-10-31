import axios from 'axios'
import { WEB_BASE } from '../APIBase'

// Create an instance of Axios with a base URL and default headers
const axiosInstance = axios.create({
  // baseURL: WEB_BASE,
  baseURL: '/api',
  headers: {
    'x-api-key': 987655,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export default axiosInstance
