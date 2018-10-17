import React from 'react'
import App, { Container } from 'next/app'
import NavBar from '../components/NavBar'
import '../styles/icons.css'
import theme from '../styles/theme'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/globalStyle'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <NavBar />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    )
  }
}
