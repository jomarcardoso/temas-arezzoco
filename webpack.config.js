var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Outstore',
      template: './src/outstore.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Anacapri',
      template: './src/anacapri.html'
    })
  ]
};