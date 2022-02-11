### 对比vue组件库打包， react组件库打包有什么不一样
vue组件库打包，vue是作为组件.install函数方法的参数隐式传入，所以vue组件打包不需要显示使用vue实例
而react组件库的HOOK写法，需要显示使用react实例，同时如果对于不同实例的react,使用hook会报错，所以react
下的组件库打包，需要将react交由业务系统版本，结合peerDependencies属性
同时还需要配置webpack.config.js的externals


### peerDependencies
peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。


### externals
防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
https://www.webpackjs.com/configuration/externals/#externals