import axios from 'axios'
import CONFIG from '../config'

export function handleResponse (response) {
  return { success: response.data.success, data: response.data.data, error: response.data.error }
}

export function handleError (error) {
  if (error.response) {
    return { success: false, error: error.response.error || error.response.statusText }
  } else if (error.request) {
    return { success: false, error: null }
  } else {
    return { success: false, error: error.message }
  }
}

export const instance = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 1000
})
