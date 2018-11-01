const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

module.exports = compose(
  withImages,
  withCSS
)({
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
    return 'cbe169bfc7a979ff7652da381197c1bdd868b47c'
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
