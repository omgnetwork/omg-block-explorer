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
  h4 {
    display: inline-block;
  }
  table {
    text-align: left;
    a {
      display: block;
      width: 100%;
    }
    td > div,
    a {
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
    key: 'from',
    value: 'From'
  },
  {
    key: 'arrow',
    value: ''
  },
  {
    key: 'to',
    value: 'To'
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
    error: PropTypes.string
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
  render () {
    return (
      <Container>
        {this.props.txs ? (
          <Card>
            <CardHeader>
              <h4>RECENT TRANSACTIONS : </h4> <span>showing latest 200 transactions</span>
            </CardHeader>
            {this.props.txs.length > 0 ? (
              <Table
                columns={columns}
                dataSource={this.props.txs.map(tx => {
                  return {
                    key: tx.txid,
                    tx: (
                      <Link as={`/transaction/${tx.txid}`} href={`/transaction?id=${tx.txid}`} prefetch>
                        <a>{tx.txid}</a>
                      </Link>
                    ),
                    block: tx.txblknum,
                    age: Moment(tx.timestamp).fromNow(),
                    from: (
                      <AddressContainer>
                        <Link as={`/address/${tx.spender1}`} href={`/address?id=${tx.spender1}`} prefetch>
                          <a>{tx.spender1}</a>
                        </Link>
                        <Link as={`/address/${tx.spender2}`} href={`/address?id=${tx.spender2}`} prefetch>
                          <a>{tx.spender2}</a>
                        </Link>
                      </AddressContainer>
                    ),
                    to: (
                      <AddressContainer>
                        <Link as={`/address/${tx.newowner1}`} href={`/address?id=${tx.newowner1}`} prefetch>
                          <a>{tx.newowner1}</a>
                        </Link>
                        <Link as={`/address/${tx.newowner2}`} href={`/address?id=${tx.newowner2}`} prefetch>
                          <a>{tx.newowner2}</a>
                        </Link>
                      </AddressContainer>
                    ),
                    amount: (
                      <div>
                        <div style={{ marginBottom: '5px' }}>
                          <span>{tx.amount1}</span> <span>{tx.token_symbol}</span>
                        </div>
                        <div>
                          <span>{tx.amount2}</span> <span>{tx.token_symbol}</span>
                        </div>
                      </div>
                    ),
                    arrow: <Icon name='Arrow-Long-Right' />
                  }
                })}
              />
            ) : (
              <Empty>There is no transaction here...</Empty>
            )}
          </Card>
        ) : (
          <Error>{this.props.error}</Error>
        )}
      </Container>
    )
  }
}
