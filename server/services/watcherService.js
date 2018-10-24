import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'
export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getTransactions ({ address, limit = 200 } = {}) {
  const query = queryString.stringify({ address, limit })
  return instance
    .get(`/transactions${query ? `?${query}` : ''}`)
    .then(handleResponse)
    .catch(handleError)
}
