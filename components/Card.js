import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardContainer = styled.div`
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
`
const Header = styled.div`
  background-color: #f7f8fa;
  padding: 20px;
`
const ContentContainer = styled.div`
  position: relative;
`

export class CardHeader extends Component {
  static propTypes = {
    childen: PropTypes.node
  }
  render() {
    return <Header className={this.props.className}>{this.props.children}</Header>
  }
}

export default class Card extends Component {
  static propTypes = {
    childen: PropTypes.node
  }

  render() {
    return (
      <CardContainer>
        <ContentContainer>{this.props.children}</ContentContainer>
      </CardContainer>
    )
  }
}
