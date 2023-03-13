### webpack-loader 原理分

代码压缩原理：结合AST，分析代码语句，将空格合并。

tree-shaking原理：
依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export
1. 先标记出模块导出值中哪些没有被用过
   标记过程分为三个步骤：
   - Make 阶段，收集模块导出变量并记录到模块依赖关系图 ModuleGraph 变量中；
   - Seal 阶段，遍历 ModuleGraph 标记模块导出变量有没有被使用；(seal 的任务是将需要编译的modules生成chunk，生成最终源码存放在 compilation.assets 属性上)
   - 生成产物时，若变量没有被其它模块使用则删除对应的导出语句
2. 使用 Terser 删掉这些没被用到的导出语句


 tree shaking 和 sideEffects
 sideEffects 和 usedExports（更多被认为是 tree shaking）是两种不同的优化方式
 sideEffects 更为有效 是因为它允许跳过整个模块/文件和整个文件子树
 usedExports 依赖于 terser(webpack v5 开箱即带有最新版本的 terser-webpack-plugin) 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 sideEffects 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的


 webpack代码混淆：UglifyJS (https://github.com/mishoo/UglifyJS)
 UglifyJS 是一款集 JavaScript 解析器，压缩器，美化器于一身的工具集