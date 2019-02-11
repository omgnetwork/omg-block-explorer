import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTransactions } from '../services/transactionService'
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
  padding-top: 50px;
  overflow: auto;
  h4 {
    display: inline-block;
  }
  table {
    text-align: left;
    @media screen and (max-width: 600px) {
      width: 800px;
      td:nth-child(2),
      td:nth-child(5),
      th:nth-child(2),
      th:nth-child(5) {
        display: none;
      }
    }
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
    td:first-child,
    th:first-child {
      padding-left: 20px;
    }
    th:nth-child(5) {
      width: 50px;
    }
    td:nth-child(5) {
      text-align: center;
      padding: 0;
      vertical-align: middle;
    }
    td {
      vertical-align: middle;
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
const AddressContainer = styled.div`
  a:first-child {
    margin-bottom: 5px;
  }
`
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
export default class HomePage extends Component {
  static propTypes = {
    txs: PropTypes.array,
    error: PropTypes.string,
    success: PropTypes.bool
  }
  static async getInitialProps (context) {
    try {
      const { data, success, error } = await getTransactions()
      return { txs: data, success, error: error && (error.description || error || 'Something going bad here...') }
    } catch (error) {
      return { error: 'something is wrong!' }
    }
  }
  static defaultProps = {
    txs: []
  }
  constructor (props) {
    super(props)
    this.state = { txs: this.props.txs, success: this.props.success, error: this.props.error }
  }
  // componentDidMount = () => {
  //   this.intervalLoadTransaction = setInterval(async () => {
  //     const { data, success, error } = await getTransactions()
  //     if (success) {
  //       this.setState({ txs: data, success, error })
  //     }
  //   }, 1000)
  // }
  // componentWillUnmount = () => {
  //   clearInterval(this.intervalLoadTransaction)
  // }
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
        {this.state.txs ? (
          <Card>
            <CardHeader>
              <h4>RECENT TRANSACTIONS : </h4> <span>showing latest 50 transactions</span>
            </CardHeader>
            {this.state.txs.length > 0 ? this.renderTable() : <Empty>There is no transaction here...</Empty>}
          </Card>
        ) : (
          <Error>{this.state.error}</Error>
        )}
      </Container>
    )
  }
}
