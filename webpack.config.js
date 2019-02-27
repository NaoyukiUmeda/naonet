const jsRoot = `${__dirname}/develop/javascripts`;
module.exports = {
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
    }]
  },
  resolve: {
    extensions: ['.js']
  }
};
