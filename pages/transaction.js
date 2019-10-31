import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { uniq, map } from 'lodash'
import Card, { CardHeader } from '../components/Card'
import Tag from '../components/Tag'
import Icon from '../components/Icon'
import styled from 'styled-components'
import Table from '../components/Table'
import Link from 'next/link'
import { truncateId } from '../utils/truncate'
import { getTransactionById } from '../services/transactionService'
import Moment from 'moment'
import getConfig from 'next/config'
import numberToBN from 'number-to-bn'

const { publicRuntimeConfig } = getConfig()
const { ETHERSCAN_URL } = publicRuntimeConfig
const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto 0 auto;
  i {
    vertical-align: middle;
  }
`
const CardContent = styled.div`
  display: flex;
  padding: 30px;
  overflow: auto;
  table {
    text-align: left;
    font-size: 14px;
    th:last-child,
    td:last-child {
      text-align: right;
      white-space: nowrap;
    }
    th:first-child,
    td:first-child {
      width: 40%;
      text-align: left;
    }
    td > div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 800px) {
    display: block;
    table {
      display: table;
      th:first-child,
      td:first-child {
        width: 50%;
      }
      th:last-child,
      td:last-child {
        width: 100%;
      }
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
  @media screen and (max-width: 600px) {
    font-size: 9px;
  }
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
  font-size: calc(32px + 1.5vw);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`
const MetadataContainer = styled.div`
  padding: 30px;
  word-break: break-all;
`
const columns = [
  {
    key: 'address',
    value: 'address'
  },
  {
    key: 'amount',
    value: 'amount'
  }
]
export default class transaction extends Component {
  static propTypes = {
    tx: PropTypes.object,
    error: PropTypes.any,
    success: PropTypes.bool
  }
  static async getInitialProps (context) {
    try {
      const { data, success, error } = await getTransactionById(context.query.id)
      return {
        tx: data,
        success: success,
        error: error.description
      }
    } catch (error) {
      return { error: 'something is wrong!' }
    }
  }

  renderTableCard () {
    return (
      <Card>
        <StyledCardHeader>
          Transferred{' '}
          {this.props.tx.inputs.map((input, index) => (
            <span key={index}>
              {input.amount} {input.token_symbol}
            </span>
          ))}
        </StyledCardHeader>
        <div style={{ overflow: 'auto' }}>
          <CardContent>
            <div>
              <h4>From</h4>
              <Table
                columns={columns}
                dataSource={this.props.tx.inputs.map(io => ({
                  key: io.owner,
                  address: (
                    <Link as={`/address/${io.owner}`} href={`/address?id=${io.owner}`} prefetch>
                      <a>{io.owner}</a>
                    </Link>
                  ),
                  amount: `${io.amount} ${io.token_symbol ? io.token_symbol : ''}`
                }))}
              />
            </div>
            <ArrowContainer>
              <Icon name='Arrow-Right' />
            </ArrowContainer>
            <div>
              <h4>To</h4>
              <Table
                columns={columns}
                dataSource={this.props.tx.outputs.map(io => ({
                  key: io.owner,
                  address: (
                    <Link as={`/address/${io.owner}`} href={`/address?id=${io.owner}`} prefetch>
                      <a>{io.owner}</a>
                    </Link>
                  ),
                  amount: `${io.amount} ${io.token_symbol ? io.token_symbol : ''}`
                }))}
              />
            </div>
          </CardContent>
          <CardContent>
            <div>
              <h4>Fees</h4>
              <div>{this.calculateFees()}</div>
            </div>
          </CardContent>
          <MetadataContainer>
            <h4>Metadata</h4>
            <div>{this.props.tx.metadata}</div>
          </MetadataContainer>
        </div>
      </Card>
    )
  }

  calculateFees () {
    const currencies = uniq(this.props.tx.inputs.map(i => i.currency))

    let fees = {}
    currencies.map(currency => {
      const inputs = this.props.tx.inputs
        .filter(i => i.currency === currency)
        .reduce((prev, curr) => {
          return prev.iadd(numberToBN(curr.amount))
        }, numberToBN(0))

      const outputs = this.props.tx.outputs
        .filter(i => i.currency === currency)
        .reduce((prev, curr) => {
          return prev.iadd(numberToBN(curr.amount))
        }, numberToBN(0))

      fees[currency] = inputs.sub(outputs).toString()
    })

    if (Object.keys(fees).length === 1) {
      return fees[Object.keys(fees)[0]].toString()
    }

    return (
      <>
        {map(fees, (amount, token) => {
          return (
            <div key={token}>
              {token} : {amount}
            </div>
          )
        })}
      </>
    )
  }

  renderTransactionHeader () {
    return (
      <TopContainer>
        <h1>Transaction</h1>
        <h2>
          <span>{truncateId(this.props.tx.txid)}</span>
        </h2>
        <SmallTxText>{this.props.tx.txid}</SmallTxText>
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
              <a>{this.props.tx.txblknum}</a>
            </Link>
          </span>
        </div>
        <div>
          <Icon name='Token' />{' '}
          <span>
            Ethereum Block height{' '}
            {ETHERSCAN_URL ? (
              <Link href={`${ETHERSCAN_URL}block/${this.props.tx.eth_height}`}>
                <a target='_blank'>{this.props.tx.eth_height}</a>
              </Link>
            ) : (
              this.props.tx.eth_height
            )}
          </span>
        </div>
        <div>
          <Icon name='Time' />
          <span>
            {' '}
            {Moment(this.props.tx.timestamp).fromNow()}
            {' | '}
            {Moment(this.props.tx.timestamp).format('HH:MM:SS A | MMMM DD[,] YYYY')}
          </span>
        </div>
      </FooterContainer>
    )
  }

  render () {
    return (
      <Container>
        {this.props.success ? (
          <Fragment>
            {this.renderTransactionHeader()}
            {this.renderTableCard()}
            {this.renderFooter()}
          </Fragment>
        ) : (
          <Error>{this.props.error}</Error>
        )}
      </Container>
    )
  }
}
