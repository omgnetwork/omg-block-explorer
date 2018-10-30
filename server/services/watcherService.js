import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'
export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getTransactions ({ address, limit = 50 } = {}) {
  const query = queryString.stringify({ address: address && `0x${String(address).toLocaleLowerCase()}`, limit })
  return instance
    .get(`/transactions${query ? `?${query}` : ''}`)
    .then(handleResponse)
    .catch(handleError)
}
