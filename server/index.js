import next from 'next'

import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'

import apiRoute from './routes/api'
import compression from 'compression'
import morgan from 'morgan'
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })

const expressApp = express()
const server = http.Server(expressApp)

const nextRequestHandler = nextApp.getRequestHandler()

const PORT = 3000

if (process.env.NODE_ENV === 'production') {
  expressApp.use(compression())
}

expressApp.use(morgan('dev'))

expressApp.use(bodyParser.json())

expressApp.use('/api', apiRoute)

expressApp.get('/transaction/:id', (req, res) => {
  const params = { id: req.params.id }
  return nextApp.render(req, res, '/transaction', params)
})
expressApp.get('/address/:id', (req, res) => {
  const params = { id: req.params.id }
  return nextApp.render(req, res, '/address', params)
})

nextApp.prepare().then(() => {
  expressApp.get('*', (req, res) => {
    return nextRequestHandler(req, res)
  })
})

expressApp.use(handleUnexpectedError)

server.listen(PORT, err => {
  if (err) throw err
  console.log(`Ready on http://localhost:${PORT}`)
})

function handleUnexpectedError (error, req, res, next) {
  res.status(500).send({ success: false, error: error.message })
}
