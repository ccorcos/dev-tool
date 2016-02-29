var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './src/browser/app.js'
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']}},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader') },
      { test: /\.(svg|gif|png|jpe?g|ttf |woff2?|eot)$/, loader: 'url?limit=8182' },
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron']),
    new webpack.optimize.UglifyJsPlugin({compressor: {screw_ie8: true, warnings: false }}),
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],
  resolve: {
    root: [
      path.resolve('src/browser'),
    ],
    modulesDirectories: [
      'node_modules'
    ]
  }
}