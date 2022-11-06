const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
// 引入速度分析插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  // 多入口
  entry: {
    index: path.resolve(__dirname, '../app/renderer/app.tsx'),
    setting: path.resolve(
      __dirname,
      '../app/renderer/windowPages/setting/app.tsx'
    ),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    assetModuleFilename: 'images/[name]_[hash].[ext]',
  },
  resolve: {
    // 这里就需要 jsx 和 tsx 了
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 别名配置，在 Electron 中并未用到别名路径，所以拆到 React 这边的配置中
    alias: {
      '@assets': path.join(__dirname, '../', 'assets/'),
      '@src': path.join(__dirname, '../', 'app/renderer'),
      '@common': path.join(__dirname, '../', 'app/renderer/common'),
    },
  },
  target: 'electron-renderer',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        // 本来想用thread-loader开多线程打包，但是却更慢了
        use: ['babel-loader'],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        '../app/renderer/windowPages/setting/index.html'
      ),
      filename: path.resolve(__dirname, '../dist/setting.html'),
      chunks: ['setting'],
    }),
    // 通过该插件实现资源文件的拷贝
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: path.resolve(__dirname, '../dist/assets'),
        },
        // {
        //   from: path.resolve(__dirname, '../appConfig'),
        //   to: path.resolve(__dirname, '../dist/appConfig'),
        // },
      ],
    }),
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, '../dist/dll/reacts.dll.js'),
    //   outputPath: '',
    //   publicPath: '',
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dist/dll/reacts.manifest.json'),
    // }),
  ],
})
