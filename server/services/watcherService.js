const { instance } = require('./apiClientService')
const { handleError, handleResponse } = require('../utils/serializer')
function getTransactionById (transactionId) {
  const query = { id: transactionId }
  return instance
    .post('/transaction.get', query)
    .then(handleResponse)
    .catch(handleError)
}

function getTransactions ({ address, limit = 50 } = {}) {
  let query = { limit: parseInt(limit) }
  if (address) {
    query = Object.assign(query, { address })
  }
  return instance
    .post('/transaction.all', query)
    .then(handleResponse)
    .catch(handleError)
}

module.exports = {
  getTransactionById,
  getTransactions
}
