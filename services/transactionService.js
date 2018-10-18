import { instance, handleError, handleResponse } from './apiClientService'

export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .catch(handleError)
}
