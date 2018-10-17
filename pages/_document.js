import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <link
          rel="stylesheet"
          href="https://cdn.omise.co/assets/fonts/CircularStd-Black/fonts.css"
        />
        <link rel="stylesheet" href="https://cdn.omise.co/fonts/circular.css" />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
