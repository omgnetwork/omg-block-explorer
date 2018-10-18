import axios from 'axios'
import CONFIG from '../config'

const instance = axios.create({
  baseURL: CONFIG.API_URL,
  timeout: 1000
})
function handleResponse (response) {
  return { success: response.data.success, data: response.data.data, error: response.data.error }
}

function handleError (error) {
  if (error.response) {
    return { success: false, error: error.response.error || error.response.statusText }
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
