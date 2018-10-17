const axios = require('axios')
const CONFIG = require('../config')

const instance = axios.create({
  baseURL: CONFIG.WATCHER_URL,
  timeout: 1000
})

function getTransactionById(transactionId) {
  return instance.get(`/transaction/${transactionId}`)
}

module.exports.getTransactionById = getTransactionById
