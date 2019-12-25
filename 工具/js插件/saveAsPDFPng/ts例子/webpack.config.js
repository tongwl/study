const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "development",
  entry: "./entry.ts",
  output: {
    //publicPath: __dirname + "/dist/", //打包资源文件的引用会基于此路径
    path: path.resolve(__dirname, "dist"), //打包后的输出目录
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./tspdf.html"
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};