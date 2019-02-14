const axios = require('axios')
const CONFIG = require('../config')

const instance = axios.create({
  baseURL: CONFIG.WATCHER_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

module.exports = {
  instance
}
