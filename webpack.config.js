var path = require('path');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: "./app.js",

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'build'),
    publicPath: '/static/'
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
}
