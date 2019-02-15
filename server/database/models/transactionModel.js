const db = require('../database')
function getTransactionsRate (rate) {
  const allowedInterval = ['1 day', '5 minutes', '1 month']
  if (!allowedInterval.includes(rate)) {
    return Promise.reject(new Error('not allowed query:'))
  }

  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) FROM transactions LEFT JOIN blocks ON transactions.blknum = blocks.blknum 
       WHERE to_timestamp(blocks.timestamp) > now() - $1::interval`,
      [rate],
      (err, res) => {
        console.log(err, res)
        if (err) reject(err)
        resolve({
          success: true,
          data: res.rows[0]
        })
      }
    )
  })
}

module.exports = {
  getTransactionsRate
}
