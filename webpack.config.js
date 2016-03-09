var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: "./app.js",

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'build'),
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        loader: ['babel'],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React':     'react',
    })
  ]
}
