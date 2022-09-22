const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../examples/index.js'),
  output: {
    path: path.join(__dirname, '../examples/'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.join(__dirname, '../examples/'),
    compress: true,
    host: '127.0.0.1',
    port: 3200,
    open: true,
  },
};

module.exports = merge(devConfig, baseConfig);
