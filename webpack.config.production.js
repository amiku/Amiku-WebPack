/*
 * Copyright (c) http://amiku.cn 2017-2018.
 * Author: Amiku Zhang <i@amiku.cn>
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

let path = require('path');
// __dirname is WebPack directory (为默认的WebPack所在的目录地址)
let ROOT_PATH = path.resolve(__dirname);
let SRC_PATH = path.resolve(ROOT_PATH, 'src');   // source code directory（源文件目录）
let DIST_PATH = path.resolve(ROOT_PATH, 'dist'); // destination directory（打包后的文件存放目录）

let PROJECT_PATH = path.resolve(SRC_PATH, 'cn.amiku'); // current dev directory（当前开发的目录）

module.exports = {
    entry: PROJECT_PATH + "/js/Index.js",   // entry file (统一入口文件): Index.js
    output: {
        path: DIST_PATH,
        filename: "js/amiku-[hash:8].js" // destination filename （打包后输出文件的文件名）
    },
    // devtool: 'eval-source-map',
    devServer: {
        contentBase: SRC_PATH,
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 8080,
        progress: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/  //exclude directories and files (屏蔽不需要处理的文件（文件夹）)
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
                            modules: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }]
            }, {
                test: /.(png|jpg|jpeg|gif)$/,
                loader: "url-loader?limit=10240&name=img/[name]-[hash:8].[ext]"
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2)(\?|$)/,
                loader: 'file-loader?name=fonts/[hash:8].[ext]'
            }]
    },
    plugins: [
        new webpack.BannerPlugin('Amiku WebPack Development<i@amiku.cn>阿米酷WebPack开发版本'),
        new HtmlWebpackPlugin({
            template: PROJECT_PATH + "/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(),//  HMR (热加载插件)
        new webpack.optimize.UglifyJsPlugin({   // UglifyJsPlugin (压缩JS代码)
            compress: {
                warnings: false // ignore warning (忽略警告要不然有一堆黄色字体的提示)
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