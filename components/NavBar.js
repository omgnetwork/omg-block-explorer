import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import Icon from '../components/Icon'
const Container = styled.div`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
const Input = styled.input`
  border-radius: 5px 0 0 5px;
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
  @media screen and (max-width: 450px) {
    height: 60px;
  }
  img {
    cursor: pointer;
    @media screen and (max-width: 450px) {
      max-width: 100px;
    }
  }
  form {
    box-sizing: border-box;
    margin-left: auto;
    max-width: 300px;
    width: 100%;
    display: flex;
    input {
      box-sizing: border-box;
    }
    > button {
      font-size: 16px;
      line-height: 37px;
      text-align: center;
      width: 50px;
      display: inline-block;
      vertical-align: middle;
      background-color: ${props => props.theme.colors.B300};
      color: white;
      border-radius: 0 5px 5px 0;
      border: 1px solid ${props => props.theme.colors.B300};
      cursor: pointer;
    }
    @media screen and (max-width: 450px) {
      max-width: 50vw;
    }
  }
`

export default class NavBar extends Component {
  onSearch = e => {
    e.preventDefault()
    let value = this.input.value
    if (value) {
      if (value.slice(0, 2) === '0x') {
        value = value.slice(2).toUpperCase()
      }
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
  }
  render () {
    return (
      <Container>
        <InnerCointainer>
          <Link href='/'>
            <a><img src={require('../statics/images/omisego-blue.svg')} /></a>
          </Link>
          <form onSubmit={this.onSearch}>
            <Input placeholder='Search tx or address' ref={input => (this.input = input)} />
            <button>
              <Icon name='Search' />
            </button>
          </form>
        </InnerCointainer>
      </Container>
    )
  }
}
