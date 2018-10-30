import React from 'react'
import App, { Container } from 'next/app'
import NavBar from '../components/NavBar'
import '../styles/icons.css'
import theme from '../styles/theme'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/globalStyle'
import Router from 'next/router'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

export default class MyApp extends App {
  state = { loading: false }
  constructor (props) {
    super(props)
    this.changingRoute = false
    Router.onRouteChangeStart = () => {
      this.changingRoute = true
      setTimeout(() => {
        if (this.changingRoute) {
          this.setState({ loading: true })
        }
      }, 300)
    }
    Router.onRouteChangeComplete = () => {
      this.changingRoute = false
      this.setState({ loading: false })
    }
  }
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <Loading show={this.state.loading} color='#1A56F0' />
          <NavBar />
          <div style={{ padding: '70px 5%' }}>
            <Component {...pageProps} />
          </div>
        </Container>
      </ThemeProvider>
    )
  }
}
