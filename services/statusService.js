import { instance } from './apiClientService'
import { handleError, handleResponse } from '../utils/serializer.js'

export function getStatus () {
  return instance
    .get('/status')
    .then(handleResponse)
    .catch(handleError)
}
