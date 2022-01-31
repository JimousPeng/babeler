/*
 * @Author: jimouspeng
 * @Date: 2022-01-31 11:19:41
 * @LastEditTime: 2022-01-31 11:19:42
 * @LastEditors: your name
 * @Description: loader-配置文件 
 * @FilePath: \engineering-about-frontend\01webpack-config\loader-config\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
module.exports = [
    {
        test: /\.js$/,
        // exclude: 缩小打包作用域, 优先级高于include
        exclude: /node_modules/,
        // test命中文件的处理loader,即文件的预处理器
        // loader: []
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        // 单独只使用css-loader的话，页面无法生效，因为css-loader的作用仅仅是处理了CSS的各种加载语法，import,url()函数等
        // 如果样式要起作用，还需要style-loader来把样式插入页面。
        // loader的调用是从后往前，所有style-loader要放到前面
        use: ['style-loader', 'css-loader']
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
                publicPath: './images/'
            }
        }
    },
    {
        test: /\.html$/i,
        use: 'html-loader'
    }
]