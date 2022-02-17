# node-version 14.16.0

### bundle体积监控和分析
1. VS Code 插件  Import Cost可以进行引入模块大小的实时监控


### webpack调优插件
1. webpack-dashboard 命令行界面仪表盘工具
2. webpack-merge 配置合并工具, 用于配置抽离
3. speed-measure-webpack-plugin,用于分析整个webpack打包过程中在各个loader和plugin上耗费的时间。
4. webpack-bundle-analyzer  打包文件分析工具,生成图片展示占用 https://www.npmjs.com/package/webpack-bundle-analyzer

有些插件会影响编译本身的速度，建议用一个命令单独进行编译监听，使用这些插件进行调优监控