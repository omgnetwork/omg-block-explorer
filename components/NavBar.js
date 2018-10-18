import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropdown from '../components/Dropdown'
import Icon from './Icon'
import Link from 'next/link'
const Container = styled.div`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
const DropdownContainer = styled.div`
  margin-left: auto;
  position: relative;
  cursor: pointer;
  span,
  i {
    vertical-align: middle;
  }
`
const InnerCointainer = styled.div`
  max-width: 70%;
  margin: 0 auto;
  display: flex;
  height: 70px;
  align-items: center;
  img {
    cursor: pointer;
  }
`

export default class NavBar extends Component {
  render () {
    return (
      <Container>
        <InnerCointainer>
          <Link href='/'>
            <img src={require('../statics/images/omisego-blue.svg')} />
          </Link>
          {/* <Dropdown
            data={['TESUJI']}
            render={({ open, dropdownBox, onClickButton }) => {
              return (
                <DropdownContainer onClick={onClickButton}>
                  <h1><span>TESUJI</span> {!open ? <Icon name='Chevron-Down' /> : <Icon name='Chevron-Up' />}</h1>{' '}
                  {open && dropdownBox}
                </DropdownContainer>
              )
            }}
          /> */}
        </InnerCointainer>
      </Container>
    )
  }
}
