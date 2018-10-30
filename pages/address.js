import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTransactions } from '../services/transactionService'
import styled from 'styled-components'
import Card, { CardHeader } from '../components/Card'
import Table from '../components/Table'
import Link from 'next/link'
import Icon from '../components/Icon'
import _ from 'lodash'
import { truncateId } from '../utils/truncate'
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
    @media screen and (max-width: 600px) {
      width: 800px;
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
const TopContainer = styled.div`
  margin-bottom: 50px;
  > h1 {
    font-family: Circular, Arial, sans-serif;
  }
  h2 {
    font-size: 34px;
    margin-top: 15px;
    margin-bottom: 5px;
    i {
      color: ${props => props.theme.colors.B100};
      vertical-align: middle;
      font-size: 18px;
    }
    span {
      vertical-align: middle;
    }
  }
`
const Empty = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 32px;
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
const SmallTxText = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.B100};
  margin-bottom: 20px;
`
export default class AddressPage extends Component {
  static propTypes = {
    txs: PropTypes.array,
    query: PropTypes.object
  }
  static async getInitialProps (context) {
    try {
      const { data, success, error } = await getTransactions({ address: context.query.id })
      return { txs: data, success, error: error && (error.description || error || 'Something going bad here...'), query: context.query }
    } catch (error) {
      return { error: 'something is wrong!' }
    }
  }
  static defaultProps = {
    txs: []
  }
  componentDidMount = () => {
    setInterval(async () => {
      const { data, success, error } = await getTransactions({ address: this.props.query })
      if (success) {
        this.setState({ txs: data, success, error })
      }
    }, 1000)
  }
  render () {
    return (
      <Container>
        <TopContainer>
          <h1>Address</h1>
          <h2>
            <span>{truncateId(this.props.query.id)}</span>
          </h2>
          <SmallTxText>{this.props.query.id}</SmallTxText>
        </TopContainer>
        <Card>
          <CardHeader>
            <h4>TRANSACTIONS: </h4> <span>showing the latest 50 transactions</span>
          </CardHeader>
          {this.props.txs.length > 0 ? (
            <div style={{ overflow: 'auto' }}>
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
            </div>
          ) : (
            <Empty>There is no transaction here...</Empty>
          )}
        </Card>
      </Container>
    )
  }
}
