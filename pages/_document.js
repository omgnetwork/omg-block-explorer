import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <title>OmiseGO Explorer</title>
        <Head>{this.props.styleTags}</Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href={require('../statics/images/favicon.png')} type='image/x-icon' />
        <link rel='shortcut icon' href={require('../statics/images/favicon.png')} type='image/x-icon' />
        <link
          rel='stylesheet'
          href='https://cdn.omise.co/assets/fonts/CircularStd-Black/fonts.css'
        />
        <link rel='stylesheet' href='https://cdn.omise.co/fonts/circular.css' />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
