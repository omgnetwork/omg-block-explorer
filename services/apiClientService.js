import axios from 'axios'
import CONFIG from '../config'

export const instance = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 10000
})
