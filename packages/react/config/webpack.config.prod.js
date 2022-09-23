const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.base.js'); // 引用公共的配置

const prodConfig = {
  mode: 'production',
  entry: {
    'hemy-progress': path.join(__dirname, '../src/index.js'),
    'hemy-progress.min': path.join(__dirname, '../src/index.js'),
  },
  output: {
    filename: '[name].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../lib'), // 打包后的目录
    library: 'hemyProgress',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  externals: {
    // 外部依赖
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
};

module.exports = merge(prodConfig, baseConfig);
