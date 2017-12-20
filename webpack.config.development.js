/*
 * Copyright (c) http://amiku.cn 2017-2018.
 * Author: Amiku Zhang <i@amiku.cn>
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

let path = require('path');
// __dirname is 为默认的WebPack所在的目录地址
let ROOT_PATH = path.resolve(__dirname);
let SRC_PATH = path.resolve(ROOT_PATH, 'src');   // source code dir（源文件目录）
let DIST_PATH = path.resolve(ROOT_PATH, 'dist'); // build d（打包后的文件存放目录）

let PROJECT_PATH = path.resolve(SRC_PATH, 'cn.amiku'); // 当前开发的目录

module.exports = {
    entry: PROJECT_PATH + "/js/Index.js",   // 统一入口文件(entry file): Index.js
    output: {
        path: DIST_PATH,
        filename: "js/amiku-[hash:8].js" // 打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: SRC_PATH, //本地服务器所加载的页面所在的目录, 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true,
        inline: true, // 设置为true，当源文件改变时会自动实时刷新页面
        hot: true,
        port: 8080, //设置默认监听端口，如果省略，默认为"8080"
        progress: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/  //屏蔽不需要处理的文件（文件夹）（可选）
            },
            {
                test: /(\.css|\.scss)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // CSS modules 的技术 只对当前组件有效
                            // 不必担心在不同的模块中使用相同的类名造成冲突
                            modules: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }]
            }, {
                test: /.(png|jpg|jpeg|gif)$/,
                loader: "url-loader?limit=10240&name=img/[name]-[hash:8].[ext]"
                // url-loader 它会将样式中引用到的图片转为模块来处理; 配置信息的参数“?limit=10240”表示将所有小于10kb的图片都转为base64形式。
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2)(\?|$)/,
                loader: 'file-loader?name=fonts/[hash:8].[ext]'
            }]
    },
    plugins: [
        new webpack.BannerPlugin('Amiku WebPack Development<i@amiku.cn>阿米酷WebPack开发版本'),
        new HtmlWebpackPlugin({
            template: PROJECT_PATH + "/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),// 热加载插件
        new webpack.optimize.UglifyJsPlugin({   // UglifyJsPlugin：压缩JS代码
            compress: {
                warnings: false // 忽略警告，要不然有一堆黄色字体的提示
            }
        }),
        new CompressionWebpackPlugin({  // gzip compress（gzip压缩）
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'  // Compress JavaScript and CSS Files（压缩 js 和 css 文件）
            ),
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};