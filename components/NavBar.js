import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dropdown from '../components/Dropdown'
import Icon from './Icon'
import Link from 'next/link'
import Router from 'next/router'
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
const Input = styled.input`
  margin-left: auto;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid ${props => props.theme.colors.S400};
  padding: 10px;
  width: 100%;
`
const InnerCointainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 5%;
  display: flex;
  height: 70px;
  align-items: center;
  img {
    cursor: pointer;
  }
  form {
    box-sizing: border-box;
    margin-left: auto;
    max-width: 300px;
    width: 100%;
    input {
      box-sizing: border-box;
    }
  }
`

export default class NavBar extends Component {
  onSearch = e => {
    e.preventDefault()
    const value = this.input.value
    switch (value.length) {
      case 64:
        Router.push(`/transaction?id=${value}`, `/transaction/${value}`)
        break
      case 40:
        Router.push(`/address?id=${value}`, `/address/${value}`)
        break
      default:
        Router.push(`/address?id=${value}`, `/address/${value}`)
    }
    this.input.blur()
  }
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
          <form onSubmit={this.onSearch}>
            <Input placeholder='Search tx or address' ref={input => this.input = input} />
          </form>
        </InnerCointainer>
      </Container>
    )
  }
}
