import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card, { CardHeader } from '../components/Card'
import Table from '../components/Table'

const Container = styled.div`
  position: relative;
  max-width: 70%;
  margin: 0 auto;
  padding-top: 50px;
  h4 {
    display: inline-block;
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
export default class HomePage extends Component {
  render () {
    return (
      <Container>
        <Card>
          <CardHeader>
            <h4>TRANSACTION : </h4> <span>showing the last 500k Records</span>
          </CardHeader>
          <Table columns={columns} />
        </Card>
      </Container>
    )
  }
}
