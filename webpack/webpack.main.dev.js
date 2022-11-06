const webpackMerge = require('webpack-merge')
const mainBaseConfig = require('./webpack.main.base.js')

const devConfig = {
  mode: 'development',
}

module.exports = webpackMerge.merge(mainBaseConfig, devConfig)
