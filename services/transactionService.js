import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'
import CONSTANT from '../constant'

function formatTransaction (tx) {
  return { ...tx, token_symbol: CONSTANT.contractTokenAddressMap[tx.cur12] }
}

export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .then(response => ({ ...response, data: formatTransaction(response.data) }))
    .catch(handleError)
}

export function getTransactions ({ address, limit = 200 } = {}) {
  const query = queryString.stringify({ address, limit })
  return instance
    .get(`/transactions${query ? `?${query}` : ''}`)
    .then(handleResponse)
    .then(response => ({ ...response, data: response.data.map(tx => formatTransaction(tx)) }))
    .catch(handleError)
}
