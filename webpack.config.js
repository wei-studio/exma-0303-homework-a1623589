const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './src/index.js'
  ],

  output: {
    path: '/dist',
    filename: 'bundle.js',
  },

  module: {
    loaders: [{
      test: /\.(js)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['latest', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?sourceMap'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
    }, {
      test: /\.(jpe?g|JPE?G|png|PNG|gif|GIF|svg|SVG|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=1024&name=[sha512:hash:base64:7].[ext]'
    },{
      test: /\.(json|JSON)$/,
      loader: 'file?name=[sha512:hash:base64:7].[ext]'
    }]
  },

  devtool: 'eval-source-map',

  plugins: [
    new WebpackNotifierPlugin({
      alwaysNotify: true
    })
  ]
};
