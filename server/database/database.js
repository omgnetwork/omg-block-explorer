const { Pool } = require('pg')
class Database {
  constructor () {
    this.pool = new Pool({ connectionString: process.env.POSTGRES_URL })
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err)
    })
  }
  disconect () {
    this.pool.end()
  }

  query (query, params, cb) {
    return params ? this.pool.query(query, params, cb) : this.pool.query(query, cb)
  }
}

module.exports = new Database()
