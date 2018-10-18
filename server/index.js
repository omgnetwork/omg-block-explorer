import next from 'next'

import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'

import apiRoute from './routes/api'
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
nextApp.prepare()
const expressApp = express()
const server = http.Server(expressApp)

const nextRequestHandler = nextApp.getRequestHandler()

const PORT = 3000

expressApp.use(bodyParser.json())

expressApp.use('/api', apiRoute)

expressApp.get('/transaction/:id', (req, res) => {
  const params = { id: req.params.id }
  return nextApp.render(req, res, '/transaction', params)
})

expressApp.get('*', (req, res) => {
  return nextRequestHandler(req, res)
})

server.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${PORT}`)
})
