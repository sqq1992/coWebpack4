const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.conf.js')

const path = require('path')

const devConfig = {
    mode: 'development',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     enforce: 'pre',
            //     use: {
            //         loader: 'eslint-loader' // 使用 eslint-loader
            //     },
            //     exclude: /nodes_modules/, // 排除依赖包文件夹
            // },
            {
                test: /\.(le|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2 // 在一个 css 中引入了另一个 css，也会执行之前两个 loader，即 postcss-loader 和 sass-loader
                        }
                    },
                    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
                    'less-loader' // 使用 less-loader 将 less 转为 css
                ]
            }
        ]
    },
    devtool: 'cheap-module-eval-soure-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        port: 4000,
        hot: true,
        overlay: true,
        proxy: {
            // 跨域代理转发
            '/user': {
                target: 'http://pdd1.quicloud.cn',
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
            },
        },
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}

module.exports = merge(commonConfig, devConfig)
