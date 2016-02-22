var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
    app: [
      'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr',
      './src/browser/app.js'
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react', 'react-hmre']}},
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      { test: /\.(svg|gif|png|jpe?g|ttf|woff2?|eot)$/, loader: 'url?limit=8182' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron'])
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