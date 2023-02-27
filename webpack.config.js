const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    popup: './src/index.js',
    options: './src/options/index.js',
    background: './src/background/index.js',
    contentScript: './src/contentScript/index.js',
    inject: './src/contentScript/inject.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [ 'babel-loader' ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', filter: async (resourcePath) => (!resourcePath.match(/.*\.(html)/)) },
      ],
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      chunks: ['options'],
      filename: 'options.html',
    }),
  ],
  devtool: 'cheap-module-source-map',
};
