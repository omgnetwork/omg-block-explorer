const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
require('dotenv').config()

const urlEtherscanMap = {
  'http://watcher-staging.omg.network': 'https://rinkeby.etherscan.io/'
}

module.exports = compose(
  withImages,
  withCSS
)({
  publicRuntimeConfig: {
    ETHERSCAN_URL: urlEtherscanMap[process.env.WATCHER_URL] || null
  },
  webpack (config, options) {
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
    return config
  },
  generateBuildId: async () => {
    return 'a-unique-build-id-hot-fix-works-for-now'
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
