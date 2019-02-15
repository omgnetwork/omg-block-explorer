import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTransactions, getTransactionRate } from '../services/transactionService'
import { getStatus } from '../services/statusService'
import styled from 'styled-components'
import Card, { CardHeader } from '../components/Card'
import Table from '../components/Table'
import Link from 'next/link'
import Icon from '../components/Icon'
import Moment from 'moment'
const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  overflow: auto;
  h4 {
    display: inline-block;
  }
  table {
    text-align: left;
    min-width: 600px;
    a {
      display: block;
      width: 100%;
    }
    td > div,
    a,
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    th:first-child {
      width: 40%;
    }
  }
`

const columns = [
  {
    key: 'tx',
    value: 'TX #'
  },
  {
    key: 'block',
    value: 'Block'
  },
  {
    key: 'age',
    value: 'Age'
  },
  {
    key: 'amount',
    value: 'Value transacted'
  }
]
const Error = styled.div`
  font-size: calc(32px + 1.5vw);
  text-align: center;
  margin-top: 50px;
`
const Empty = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 32px;
`
const StatusContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  b {
    font-weight: 600;
  }
`
const Blocks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  > div {
    padding: 10px 30px;
    :first-child {
      padding-left: 0;
    }
    :last-child {
      padding-right: 0;
    }
  }
`

async function fetchData () {
  const result = await Promise.all([
    getTransactions(),
    getStatus(),
    getTransactionRate('1 day'),
    getTransactionRate('5 minutes'),
    getTransactionRate('1 month')
  ]).then(([txResult, statusResult, rateDayResult, rateMinResult, rateMonthResult]) => {
    return {
      txResult,
      statusResult,
      rateDayResult,
      rateMinResult,
      rateMonthResult
    }
  })
  return result
}
export default class HomePage extends Component {
  static propTypes = {
    txs: PropTypes.array,
    txError: PropTypes.string,
    status: PropTypes.object,
    rateDay: PropTypes.string,
    rateMin: PropTypes.string,
    rateMonth: PropTypes.string
  }

  static async getInitialProps (context) {
    try {
      const {
        txResult,
        statusResult,
        rateDayResult,
        rateMinResult,
        rateMonthResult
      } = await fetchData()
      return {
        txs: txResult.data,
        txError: txResult.error.description,
        status: statusResult.data,
        rateDay: rateDayResult.data.count,
        rateMin: rateMinResult.data.count,
        rateMonth: rateMonthResult.data.count
      }
    } catch (error) {
      return { error: 'something is wrong!' }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      txs: this.props.txs,
      txError: this.props.txError,
      rateDay: this.props.rateDay,
      rateMin: this.props.rateMin,
      rateMonth: this.props.rateMonth
    }
  }

  componentDidMount = () => {
    this.intervalLoadTransaction = setInterval(async () => {
      const {
        txResult,
        statusResult,
        rateDayResult,
        rateMinResult,
        rateMonthResult
      } = await fetchData()
      this.setState({
        txs: txResult.data,
        txError: txResult.error.description,
        status: statusResult.data,
        rateDay: rateDayResult.data.count,
        rateMin: rateMinResult.data.count,
        rateMonth: rateMonthResult.data.count
      })
    }, 5000)
  }
  componentWillUnmount = () => {
    clearInterval(this.intervalLoadTransaction)
  }

  renderTable () {
    return (
      <div style={{ overflow: 'auto' }}>
        <Table
          columns={columns}
          dataSource={this.state.txs.map(tx => {
            return {
              key: tx.txid,
              tx: (
                <Link as={`/transaction/${tx.txid}`} href={`/transaction?id=${tx.txid}`} prefetch>
                  <a>{tx.txid}</a>
                </Link>
              ),
              block: tx.txblknum,
              age: Moment(tx.timestamp).fromNow(),
              amount: (
                <div>
                  {tx.amounts.map((amount, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                      <span>{amount.value}</span> <span>{amount.token_symbol}</span>
                    </div>
                  ))}
                </div>
              ),
              arrow: <Icon name='Arrow-Long-Right' />
            }
          })}
        />
      </div>
    )
  }

  render () {
    return (
      <Container>
        <Blocks>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '42px' }}>{this.state.rateMin}</div>
            <div>Transactions in last 5 Minutes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '42px' }}>{this.state.rateDay}</div>
            <div>Transactions in last 24 hours</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '42px' }}>{this.state.rateMonth}</div>
            <div>Transactions in last 30 days</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '42px' }}>
              {this.props.status.last_validated_child_block_number}
            </div>
            <div>Latest Validated Block</div>
          </div>
        </Blocks>
        <StatusContainer>
          <b>lastest validate block time: </b>
          {Moment(this.props.status.last_mined_child_block_timestamp * 1000).fromNow()}
          {' | '}
          {Moment(this.props.status.last_mined_child_block_timestamp * 1000).format(
            'HH:MM:SS A | MMMM DD[,] YYYY'
          )}
        </StatusContainer>
        {this.state.txs ? (
          <Card>
            <CardHeader>
              <h4>RECENT TRANSACTIONS : </h4> <span>showing latest 50 transactions</span>
            </CardHeader>
            {this.state.txs.length > 0 ? (
              this.renderTable()
            ) : (
              <Empty>There is no transaction here...</Empty>
            )}
          </Card>
        ) : (
          <Error>{this.state.txError}</Error>
        )}
      </Container>
    )
  }
}
