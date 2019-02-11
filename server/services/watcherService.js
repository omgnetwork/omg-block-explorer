import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'

export function getTransactionById (transactionId) {
  const query = {id: transactionId}
  return instance
    .post(`/transaction.get`, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(handleResponse)
    .catch(handleError)
}

export function getTransactions ({ address, limit = 50 } = {}) {
  let query = { limit: parseInt(limit) }
  if (address) {
    query = Object.assign(query, { address: address })
  }
  return instance
    .post(`/transaction.all`, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(handleResponse)
    .catch(handleError)
}
