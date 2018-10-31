import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'
export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .catch(handleError)
}

export function getTransactions ({ address, limit = 50 } = {}) {
  let query = { limit }
  if (address) {
    query = Object.assign(query, { address: address && `0x${String(address).toLocaleLowerCase()}` })
  }
  const qs = queryString.stringify(query)
  return instance
    .get(`/transactions${qs ? `?${qs}` : ''}`)
    .then(handleResponse)
    .catch(handleError)
}
