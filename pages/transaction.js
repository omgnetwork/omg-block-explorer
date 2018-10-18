import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Card, { CardHeader } from '../components/Card'
import Tag from '../components/Tag'
import Icon from '../components/Icon'
import styled from 'styled-components'
import Table from '../components/Table'
import Link from 'next/link'
import { truncateId } from '../utils/truncate'
import { getTransactionById } from '../services/transaction'
const Container = styled.div`
  max-width: 70%;
  margin: 50px auto 0 auto;
  i {
    vertical-align: middle;
  }
`
const CardContent = styled.div`
  display: flex;
  padding: 30px;
  > div {
    flex: 1 1 auto;
  }
  table {
    text-align: left;
    table-layout: fixed;
    font-size: 14px;
    th:last-child,
    td:last-child {
      text-align: right;
    }
    th:first-child,
    td:first-child {
      width: 70%;
      text-align: left;
    }
    td > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
const SmallTxText = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.B100};
  margin-bottom: 20px;
`
const ArrowContainer = styled.div`
  text-align: center;
  width: 150px;
  flex: 0 0 100px;
  font-size: 24px;
  color: ${props => props.theme.colors.B100};
  position: relative;
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`
const FooterContainer = styled.div`
  margin-top: 40px;
  font-size: 14px;
  display: flex;
  > div:not(:last-child) {
    margin-right: 30px;
  }
  div:last-child {
    margin-left: auto;
  }
  span {
    vertical-align: middle;
  }
`
const StyledCardHeader = styled(CardHeader)`
  font-size: 18px;
  span {
    font-weight: 900;
  }
`
const Error = styled.div`
  font-size: 32px;
  text-align: center;
  margin-top: 100px;
`
const columns = [
  {
    key: 'address',
    value: 'address'
  },
  {
    key: 'input',
    value: 'input'
  }
]
export default class transaction extends Component {
  static propTypes = {
    tx: PropTypes.object
  }
  static async getInitialProps (context) {
    try {
      const tx = await getTransactionById(context.query.id)
      return { tx: tx.data }
    } catch (err) {
      return { error: err.response.statusText || 'tx not found or something is wrong!' }
    }
  }
  renderTableCard () {
    return (
      <Card>
        <StyledCardHeader>
          Transferred <span>{this.props.tx.data.amount1} ETH</span>
        </StyledCardHeader>
        <CardContent>
          <div>
            <h4>From</h4>
            <Table
              columns={[{ key: 'address', value: 'address' }]}
              dataSource={[
                {
                  key: this.props.tx.data.spender1,
                  address: (
                    <Link href='/' prefetch>
                      <a>{this.props.tx.data.spender1}</a>
                    </Link>
                  )
                }
              ]}
            />
          </div>
          <ArrowContainer>
            <Icon name='Arrow-Right' />
          </ArrowContainer>
          <div>
            <h4>To</h4>
            <Table
              columns={columns}
              dataSource={[
                {
                  key: this.props.tx.data.newowner1,
                  address: (
                    <Link href='/' prefetch>
                      <a>{this.props.tx.data.newowner1}</a>
                    </Link>
                  ),
                  input: `${this.props.tx.data.amount1} ETH`
                },
                {
                  key: this.props.tx.data.newowner2,
                  address: (
                    <Link href='/' prefetch>
                      <a>{this.props.tx.data.newowner2}</a>
                    </Link>
                  ),
                  input: `${this.props.tx.data.amount2} ETH`
                }
              ]}
            />
          </div>
        </CardContent>
      </Card>
    )
  }
  renderTransactionHeader () {
    return (
      <TopContainer>
        <h1>Transaction</h1>
        <h2>
          <span>{truncateId(this.props.tx.data.txid)}</span>
        </h2>
        <SmallTxText>{this.props.tx.data.txid}</SmallTxText>
        <Tag>SUCCESS</Tag>
      </TopContainer>
    )
  }
  renderFooter () {
    return (
      <FooterContainer>
        <div>
          <Icon name='Token' />{' '}
          <span>
            OMG Block height{' '}
            <Link href='/' prefetch>
              <a>{this.props.tx.data.txblknum}</a>
            </Link>
          </span>
        </div>
        <div>
          <Icon name='Token' />{' '}
          <span>
            Ethereum Block height{' '}
            <Link href='/' prefetch>
              <a>{this.props.tx.data.txblknum}</a>
            </Link>
          </span>
        </div>
        <div>
          <Icon name='Time' /> <span>3 hrs. 23 mins ago | 3 hrs. 23 mins ago | 3 hrs. 23 mins ago</span>
        </div>
      </FooterContainer>
    )
  }

  render () {
    return (
      <Container>
        {this.props.tx ? (
          <Fragment>
            {this.renderTransactionHeader()}
            {this.renderTableCard()}
            {this.renderFooter()}
          </Fragment>
        ) : (
          <Error>tx not found or something is wrong!</Error>
        )}
      </Container>
    )
  }
}
