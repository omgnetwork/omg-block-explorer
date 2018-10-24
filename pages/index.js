import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTransactions } from '../services/transactionService'
import styled from 'styled-components'
import Card, { CardHeader } from '../components/Card'
import Table from '../components/Table'
import Link from 'next/link'
import Icon from '../components/Icon'

const Container = styled.div`
  position: relative;
  max-width: 70%;
  margin: 0 auto;
  padding-top: 50px;
  h4 {
    display: inline-block;
  }
  table {
    text-align: left;
    a {
      display: inline-block;
      width: 100%;
    }
    td > div,a {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    td:first-child,
    th:first-child {
      padding-left: 20px;
    }
    th:nth-child(4) {
      width: 50px;
    }
    td:nth-child(4) {
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
export default class HomePage extends Component {
  static propTypes = {
    txs: PropTypes.array
  }
  static async getInitialProps (context) {
    try {
      const { data, success, error } = await getTransactions()
      return { txs: data, success, error }
    } catch (error) {
      return { error: 'something is wrong!' }
    }
  }
  render () {
    return (
      <Container>
        <Card>
          <CardHeader>
            <h4>TRANSACTION : </h4> <span>showing the last 500k Records</span>
          </CardHeader>
          <Table
            columns={columns}
            dataSource={this.props.txs.map(tx => {
              return {
                key: tx.txid,
                tx: (
                  <Link as={`/transaction/${tx.txid}`} href={`/transaction/?id=${tx.txid}`} prefetch>
                    <a>{tx.txid}</a>
                  </Link>
                ),
                block: tx.txblknum,
                from: (
                  <div>
                    <Link href='/' prefetch>
                      <a>{tx.spender1}</a>
                    </Link>
                    <br />
                    <Link href='/' prefetch>
                      <a>{tx.spender2}</a>
                    </Link>
                  </div>
                ),
                to: (
                  <div>
                    <Link href='/' prefetch>
                      <a>{tx.newowner1}</a>
                    </Link>
                    <br />
                    <Link href='/' prefetch>
                      <a>{tx.newowner2}</a>
                    </Link>
                  </div>
                ),
                amount: (
                  <div>
                    {tx.amount1} ETH
                    <br />
                    {tx.amount2} ETH
                  </div>
                ),
                arrow: <Icon name='Arrow-Long-Right' />
              }
            })}
          />
        </Card>
      </Container>
    )
  }
}
