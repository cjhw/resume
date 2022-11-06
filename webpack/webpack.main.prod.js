const webpackMerge = require('webpack-merge')
const mainBaseConfig = require('./webpack.main.base.js')

const prodConfig = {
  mode: 'production',
}

module.exports = webpackMerge.merge(mainBaseConfig, prodConfig)
