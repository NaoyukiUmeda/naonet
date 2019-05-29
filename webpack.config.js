const jsRoot = `${__dirname}/develop/javascripts`;
const webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  mode: 'production',
  entry: {
    index: `${__dirname}/develop/javascripts/entry/index.js`,
  },
  output: {
    filename: '[name].js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modlues/],
      use: [{
        loader: 'source-map-loader',
      }],
      enforce: 'pre'
    }, {
      test: /\.js$/,
      exclude: [/node_modlues/],
      use: [{
        loader: 'babel-loader',
      }]
    }]
  },
  resolve: {
    extensions: ['.js']
  }
};
