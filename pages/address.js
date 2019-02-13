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
    query: PropTypes.object,
    success: PropTypes.bool,
    error: PropTypes.string
  }
  static async getInitialProps (context) {
    try {
      const { data, success, error } = await getTransactions({ address: context.query.id })
      return {
        txs: data,
        success,
        error: error.description,
        query: context.query
      }
    } catch (error) {
      return { error: 'something is wrong!' }
    }
  }

  constructor (props) {
    super(props)
    this.state = { txs: this.props.txs, success: this.props.success, error: this.props.error }
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
          {this.state.success ? (
            <div style={{ overflow: 'auto' }}>
              <Table
                columns={columns}
                dataSource={this.state.txs.map(tx => {
                  return {
                    key: tx.txid,
                    tx: (
                      <Link
                        as={`/transaction/${tx.txid}`}
                        href={`/transaction?id=${tx.txid}`}
                        prefetch
                      >
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
          ) : (
            <Empty>{this.state.error}</Empty>
          )}
        </Card>
      </Container>
    )
  }
}
