const { instance } = require('./apiClientService')
const { handleError, handleResponse } = require('../utils/serializer')

function getStatus () {
  return instance
    .post('/status.get')
    .then(handleResponse)
    .catch(handleError)
}

module.exports = { getStatus }
