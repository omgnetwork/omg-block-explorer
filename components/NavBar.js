import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
const Container = styled.div`
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
    input {
      box-sizing: border-box;
    }
    @media screen and (max-width: 450px) {
      max-width: 50vw;
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
          <form onSubmit={this.onSearch}>
            <Input placeholder='Search tx or address' ref={input => (this.input = input)} />
          </form>
        </InnerCointainer>
      </Container>
    )
  }
}
