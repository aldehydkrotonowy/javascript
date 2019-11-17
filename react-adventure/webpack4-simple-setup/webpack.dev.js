// wygenerowane na podstawie
// https://github.com/postNirjhor/webpack-boilerplate/blob/master/webpack.config.js
const path = require('path');
const  webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {

  // absolute path for project root
  context: path.resolve(__dirname, 'src'),

  entry: {
    // relative path declaration
    app: './index.js'
  },

  output: {
    // absolute path declaration
    path: path.resolve(__dirname, 'build'),
    filename: 'static/[name].bundle.js'
  },

  module: {
    // rules: [
    //   // html-loader
    //   { test: /\.html$/, use: ['html-loader'] }
    // ]
  },

  plugins: [
    // cleaning up only 'build' folder
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin(),
  ],

  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, "./build/static/"),
    compress: true,
    // open app in localhost:2000
    port: 2500,
    stats: 'errors-only',
    open: true
  },

  devtool: 'inline-source-map'

}

module.exports = config;