(function(graphCode) {
            var module = {
                exports: {}
            }
            function require(moduleID) {


                (function(require, exports, module){

                    console.log(moduleID);
                    eval(graphCode[moduleID].code);
                    
                })(require, module.exports, module)
                
                console.log(module, '打印看看module');
                return module.exports;
            }
            require('./src/index.js')
        })({"./src/index.js":{"dependecies":{"./a.js":".\\src\\a.js"},"code":"\"use strict\";\n\nvar _interopRequireDefault = require(\"@babel/runtime-corejs3/helpers/interopRequireDefault\");\n\nvar _promise = _interopRequireDefault(require(\"@babel/runtime-corejs3/core-js-stable/promise\"));\n\nvar _require = require(\".\\\\src\\\\a.js\"),\n    hisName = _require.hisName;\n\nconsole.log('打印一下jimous', hisName);\n\nvar a = function a() {\n  console.log('箭头函数a');\n};\n\na();\n\n_promise.default.resolve('123');"},".\\src\\a.js":{"dependecies":{},"code":"\"use strict\";\n\nexports.hisName = 'jimous';"},"@babel/runtime-corejs3/helpers/interopRequireDefault":{"dependecies":{},"code":"function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    \"default\": obj\n  };\n}\n\nmodule.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;"},"@babel/runtime-corejs3/core-js-stable/promise":{"dependecies":{},"code":"module.exports = require(\"core-js-pure/stable/promise\");"}})