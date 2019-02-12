const express = require('express')
const { getTransactionById, getTransactions } = require('../services/watcherService')
const createRouteHandler = require('./createRouteHandler')
const router = express.Router()

router.get(
  '/transactions',
  createRouteHandler((req, res) => {
    return getTransactions({ address: req.query.address, limit: req.query.limit })
  })
)

router.get(
  '/transaction/:id',
  createRouteHandler((req, res) => {
    return getTransactionById(req.params.id)
  })
)

router.get('/block', (req, res) => {
  res.send(true)
})

router.get('/blocks', (req, res) => {
  res.send(true)
})

router.get('/utxo', (req, res) => {
  res.send(true)
})

router.get('/utxos', (req, res) => {
  res.send(true)
})

module.exports = router
