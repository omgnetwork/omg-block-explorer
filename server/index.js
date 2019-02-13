/* eslint-disable import/first */
console.log('Initializing app...')
require('dotenv').config()

const invariant = require('invariant')
const CONFIG = require('./config')
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { ETHERSCAN_URL } = publicRuntimeConfig

invariant(!!process.env.ETHERSCAN_URL, 'Missing etherscan url in environment.')
console.log('Watcher url is:', CONFIG.WATCHER_URL)
console.log('Etherscan url is:', ETHERSCAN_URL)

const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

const apiRoute = require('./routes/api')
const compression = require('compression')
const morgan = require('morgan')

const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const LRUCache = require('lru-cache')

const expressApp = express()
const server = http.Server(expressApp)

const nextRequestHandler = nextApp.getRequestHandler()

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 5
})

const PORT = 3000

if (process.env.NODE_ENV === 'production') {
  expressApp.use(compression())
}

expressApp.use(morgan('common'))

expressApp.use(bodyParser.json())

expressApp.use('/api', apiRoute)

nextApp.prepare().then(() => {
  expressApp.get('/transaction/:id', (req, res) => {
    const params = { id: req.params.id }
    return renderAndCache(req, res, '/transaction', params)
  })
  expressApp.get('/address/:id', (req, res) => {
    const params = { id: req.params.id }
    return renderAndCache(req, res, '/address', params)
  })

  expressApp.get('/', (req, res) => {
    return renderAndCache(req, res, '/')
  })

  expressApp.get('*', (req, res) => {
    return nextRequestHandler(req, res)
  })
})

expressApp.use(handleUnexpectedError)

server.listen(PORT, err => {
  if (err) throw err
  console.log(`Server is ready on port:${PORT}`)
})

function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    console.log('cache hits!', key)
    return res.send(ssrCache.get(key))
  }

  try {
    const html = await nextApp.renderToHTML(req, res, pagePath, queryParams)

    if (res.statusCode !== 200) {
      return res.send(html)
    }
    ssrCache.set(key, html)
    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    nextApp.renderError(err, req, res, pagePath, queryParams)
  }
}

function handleUnexpectedError (error, req, res, next) {
  res.status(500).send({ success: false, error: error.message })
}
