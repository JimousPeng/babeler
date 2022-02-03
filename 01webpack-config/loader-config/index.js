/*
 * @Author: jimouspeng
 * @Date: 2022-01-31 11:19:41
 * @LastEditTime: 2022-02-03 10:08:57
 * @LastEditors: your name
 * @Description: loader-配置文件
 * @FilePath: \engineering-about-frontend\01webpack-config\loader-config\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 宏观角度看，提升性能的方法无非两种，
 * 增加资源： 使用更多的CPU和内存，用更多的计算能力来缩短执行任务的时间，可以结合使用HappyPack
 * 缩小范围：针对任务本身，比如去掉冗余的流程，尽量不做重复性的工作等。合理利用exclude和include
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        test: /\.js$/,
        // exclude: 缩小打包作用域, 优先级高于include
        exclude: /node_modules/,
        // test命中文件的处理loader,即文件的预处理器
        use: [
            {
                // 处理通过yarn add ../self-loader安装loader依赖(针对单独的loader文件夹)
                // 如果loader文件就跟webpack工程一个目录，那么可以直接在loader配置里面通过path.resolve路径处理依赖
                loader: 'self-loader', // 当loader文件放到工程内部，用path.resolve(__dirname, './self-loader')引用
                options: {
                    type: '1212',
                },
            },
        ],
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        // 单独只使用css-loader的话，页面无法生效，因为css-loader的作用仅仅是处理了CSS的各种加载语法，import,url()函数等
        // 如果样式要起作用，还需要style-loader来把样式插入页面。
        // loader的调用是从后往前，所有style-loader要放到前面
        // use: ['style-loader', 'css-loader'],
        use: [
            // 使用MiniCssExtractPlugin分离样式文件
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './'
                }
            },
            'css-loader',
        ],
    },
    /**
     * file-loader: 用于打包文件类型的资源，并返回其publicPath
     * url-loader: 与file-loader类似，唯一不同是可以设置一个文件大小的阈值，小于阈值返回base64形式编码
     */
    {
        test: /\.(png|jpg|gif)$/,
        // 当loader只配置一个的前提下，也可以只传字符串即可
        //    use: {
        //        loader: 'file-loader',
        //        options: {
        //            name: '[name]_[hash].[ext]',
        //            publicPath: './images/'
        //        }
        //    }
        use: {
            loader: 'url-loader',
            options: {
                // limit 单位是byte
                limit: 1024 * 45,
                name: '[name]_[hash].[ext]',
                publicPath: './images/',
            },
        },
    },
    {
        test: /\.html$/i,
        use: 'html-loader',
    },
];
