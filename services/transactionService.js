import { instance, handleError, handleResponse } from './apiClientService'
import queryString from 'query-string'
import CONSTANT from '../constant'

function formatTransaction (tx) {
  if (typeof tx === 'object') {
    currency = tx.results[0].currency
    // return { ...tx, token_symbol: CONSTANT.contractTokenAddressMap[`0x${tx.txhash.toLowerCase()}`], timestamp: Math.round(tx.timestamp * 1000) }
    return { ...tx, token_symbol: CONSTANT.contractTokenAddressMap[currency], timestamp: Math.round(tx.block.timestamp * 1000) }
  }
  return tx
}

function formatTransactionAll (tx) {
  if (typeof tx === 'object') {
    // return { ...tx, token_symbol: CONSTANT.contractTokenAddressMap[`0x${tx.txhash.toLowerCase()}`], timestamp: Math.round(tx.timestamp * 1000) }
    return {
      txid: tx.txhash,
      txblknum: tx.block.blknum,
      timestamp: Math.round(tx.block.timestamp * 1000),
      amounts: tx.results
    }
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
    .then(response => ({ ...response, data: response.data.map(tx => formatTransactionAll(tx)) }))
    .catch(handleError)
}
