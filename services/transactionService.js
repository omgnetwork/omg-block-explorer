import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'
import CONSTANT from '../constant'

function formatTransaction (tx) {
  if (typeof tx === 'object') {
    return { ...tx, token_symbol: CONSTANT.contractTokenAddressMap[`0x${tx.cur12.toLowerCase()}`], timestamp: Math.round(tx.timestamp * 1000) }
  }
  return tx
}

export function getTransactionById (transactionId) {
  return instance
    .get(`/transaction/${transactionId}`)
    .then(handleResponse)
    .then(response => ({ ...response, data: formatTransaction(response.data) }))
    .catch(handleError)
}

export function getTransactions ({ address, limit = 50 } = {}) {
  let query = { limit }
  if (address) {
    query = Object.assign(query, { address })
  }
  const qs = queryString.stringify(query)
  return instance
    .get(`/transactions${qs ? `?${qs}` : ''}`)
    .then(handleResponse)
    .then(response => ({ ...response, data: response.data.map(tx => formatTransaction(tx)) }))
    .catch(handleError)
}
