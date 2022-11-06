const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    //  我这里将 lodash 也放在 reacts 中了，实际上是可以拆分的
    reacts: ['react', 'react-dom', 'react-redux', 'lodash'],
  },
  output: {
    library: '[name]',
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist/dll'),
  },
  plugins: [
    // 新增变量
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dist/dll/[name].manifest.json'),
    }),
  ],
}
