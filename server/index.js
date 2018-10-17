const next = require('next')
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
nextApp.prepare()

const express = require('express')
const bodyParser = require('body-parser')
const expressApp = express()

const server = require('http').Server(expressApp)

const nextRequestHandler = nextApp.getRequestHandler()

const apiRoute = require('./routes/api')

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
