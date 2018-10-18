import axios from 'axios'
import CONFIG from '../config'
import { handleError, handleResponse } from '../utils/responseHandler'
const instance = axios.create({
  baseURL: CONFIG.WATCHER_URL,
  timeout: 1000
})

export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .catch(handleError)
}
