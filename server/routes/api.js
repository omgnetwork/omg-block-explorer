import express from 'express'
import { getTransactionById } from '../services/watcherService'
import createRouteHandler from './createRouteHandler'
const router = express.Router()

router.get('/transactions', (req, res) => {
  res.send(true)
})

router.get('/transaction/:id', createRouteHandler((req, res) => {
  return getTransactionById(req.params.id)
}))

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

export default router
