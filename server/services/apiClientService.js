const axios = require('axios')
const CONFIG = require('../config')

function handleResponse (response) {
  return { success: response.data.success, data: response.data.data }
}

function handleError (error) {
  if (error.response) {
    return { success: false, error: error.response.data.data || error.response.statusText }
  } else if (error.request) {
    return { success: false, error: null }
  } else {
    return { success: false, error: error.message }
  }
}

const instance = axios.create({
  baseURL: CONFIG.WATCHER_URL,
  timeout: 10000
})

module.exports = {
  handleResponse, handleError, instance
}
