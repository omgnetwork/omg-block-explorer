import axios from 'axios'
import CONFIG from '../config'

export function handleResponse (response) {
  console.log(response.data.data)
  return { success: response.data.success, data: response.data.data }
}

export function handleError (error) {
  if (error.response) {
    return { success: false, error: error.response.data.data || error.response.statusText }
  } else if (error.request) {
    return { success: false, error: null }
  } else {
    return { success: false, error: error.message }
  }
}

export const instance = axios.create({
  baseURL: CONFIG.WATCHER_URL,
  timeout: 10000
})
