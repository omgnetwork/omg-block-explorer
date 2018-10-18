import axios from 'axios'
import CONFIG from '../config'

const instance = axios.create({
  baseURL: CONFIG.WATCHER_URL,
  timeout: 1000
})

function handleResponse (response) {
  return { success: response.data.result === 'success', data: response.data.data }
}

function handleError (error) {
  if (error.response) {
    return { success: false, error: error.response.statusText }
  } else if (error.request) {
    return { success: false, error: null }
  } else {
    return { success: false, error: error.message }
  }
}

export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .catch(handleError)
}
