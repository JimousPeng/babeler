### Rollup： 专注js打包的构建工具

### rollup可直接全局安装

### tree shaking： 为死代码添加标记，在打包过程中帮助我们检测工程中没有被引用过的模块。webpack的tree shaking借鉴了rollup的tree shaking；

基于ES6 Modules的静态分析。

### 场景设计

rollup适合构建js库，相比于webpack：
1. 最低限度的附加代码；
2. 对ES6 Module的良好支持；
3. 通过tree shaking去除开发环境代码；
4. 通过自定义插件来实现React 一些特殊的打包逻辑.
