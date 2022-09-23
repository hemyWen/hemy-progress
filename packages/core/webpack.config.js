const path = require('path');
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const devMode = process.argv.indexOf('--mode=production') === -1
const entry = devMode ? './example/index.js' : './src/main.js'
module.exports = {
    mode: devMode ? 'development' : 'production',

    entry: devMode ? ['@babel/polyfill', path.resolve(__dirname, entry)] : {
        'hemy-progress': ['@babel/polyfill', path.resolve(__dirname, entry)],
        'hemy-progress.min': ['@babel/polyfill', path.resolve(__dirname, entry)]
    },
    output: {
        filename: '[name].js',      // 打包后的文件名称
        path: path.resolve(__dirname, './lib'),  // 打包后的目录
        library: 'hemyProgress',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    },
    performance: {
        hints: false // 枚举

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: devMode ? [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html',
        }),
        new Webpack.HotModuleReplacementPlugin()
    ] : [],
    devServer: {
        port: 3300,
        hot: true,
        client: {
            logging: 'error'
        }
    },
}
