import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TagContainer = styled.div`
  border-radius: 20px;
  background-color: #a7ecde;
  height: 24px;
  width: 88px;
  text-align: center;
  position: relative;
  > span {
    position: absolute;
    display: inline-block;
    top: 50%;
    font-size: 12px;
    color: #3E685F;
    font-weight: 900;
    left: 0;
    right: 0;
    margin: 0 auto;
    transform: translateY(-50%);
  }
`
export default class Tag extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return <TagContainer><span>{this.props.children}</span></TagContainer>
  }
}
