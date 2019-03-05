const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
require('dotenv').config()

const urlEtherscanMap = {
  'http://watcher-staging.omg.network': 'https://rinkeby.etherscan.io/',
  'https://watcher.ari.omg.network': 'https://rinkeby.etherscan.io/'
}
const etherscanUrl = urlEtherscanMap[process.env.WATCHER_URL]
console.log('Etherscan url is:', etherscanUrl)

module.exports = compose(
  withImages,
  withCSS
)({
  publicRuntimeConfig: {
    ETHERSCAN_URL: etherscanUrl || null
  },
  webpack (config, options) {
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'FriendlyErrorsWebpackPlugin'
    )

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader',
            publicPath: '/_next/static/fonts/',
            outputPath: 'static/fonts/',
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    })
    config.plugins.push(new FriendlyErrorsWebpackPlugin({ clearConsole: false }))
    return config
  }
})

function compose () {
  let composed
  return param => {
    composed = arguments[0](param)
    for (let i = 1; i < arguments.length; i++) {
      composed = arguments[i](composed)
    }
    return composed
  }
}
