const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
    entry: {
        app: './src/app.js' // 需要打包的文件入口
    },
    output: {
        publicPath: './', // js 引用的路径或者 CDN 地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: '[name].bundle.js', // 代码打包后的文件名
        chunkFilename: '[name].js' // 代码拆分后的文件名
    },
    plugins: [
        new CleanWebpackPlugin(), // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
        new HtmlWebpackPlugin({
            // 打包输出HTML
            title: '自动生成 HTML',
            minify: {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
            },
            filename: 'index.html', // 生成后的文件名
            template: 'index.html' // 根据此模版生成 HTML 文件
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        }),
        // 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, './*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, './src/*.js')
            ])
        }),

        new webpack.HotModuleReplacementPlugin(), // 热部署模块
        new webpack.NamedModulesPlugin(),

    ],
    module: {       //放在最后的 loader 首先被执行，从上往下写的话是下面先执行，从左往右写的话是右边先执行。
        rules: [
            {
                test: /\.js$/, // 使用正则来匹配 js 文件
                exclude: /node_modules/, // 排除依赖包文件夹
                use: {
                    loader: 'babel-loader' // 使用 babel-loader
                }
            },
            {
                test: /\.(le|c)ss$/, // 针对 .sass .scss 或者 .css 后缀的文件设置 loader
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
                    'less-loader' // 使用 less-loader 将 less 转为 css
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 20000, // size <= 1KB
                            outputPath: 'images/'
                        }
                    },
                    // img-loader for zip img
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         // 压缩 jpg/jpeg 图片
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65 // 压缩率
                    //         },
                    //         // 压缩 png 图片
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         }
                    //     }
                    // }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                lodash: {
                    name: 'lodash',
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 10
                },
                commons: {
                    name: 'commons',
                    minSize: 0, //表示在压缩前的最小模块大小,默认值是 30kb
                    minChunks: 2, // 最小公用次数
                    priority: 5, // 优先级
                    reuseExistingChunk: true // 公共模块必开启
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    devtool: 'source-map', // 开启调试
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 4000, // 本地服务器端口号
        // hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
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
        historyApiFallback: {
            // HTML5 history模式
            rewrites: [{ from: /.*/, to: '/index.html' }],
        },
    },
};
