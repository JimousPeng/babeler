/*
 * @Author: jimouspeng
 * @Date: 2022-04-21 15:31:39
 * @Description: rollup脚本文件
 * @FilePath: \engineering-about-frontend\04RollupTool\index.js
 */
console.time('compile start----');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const path = require('path');

const compileEnv = process.env.TARGET_ENV;

const inputEntry = {
    UMD: path.resolve('./src/index.js'),
    VUE: path.resolve('./vue/index.js'),
};

const outputConfig = {
    UMD: {
        file: path.resolve('./dist/umd.js'),
        name: 'umd-module',
    },
    VUE: {
        file: path.resolve('./dist/umd.js'),
        name: 'umd-module',
    },
};

// see below for details on the options
/**
 * 【input】：唯一必填参数 --input
 */
const inputOptions = {
    input: inputEntry[compileEnv],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
        }),
    ],
    external: [/@babel\/runtime/],
};
/**
 * 【file】：要写入的文件 --output.file
 * 【format 】生成包的格式： --output.format
 */
const outputOptions = {
    format: 'umd',
    globals: {
        '@babel/runtime-corejs3/core-js-stable/promise': 'promise',
    },
    ...outputConfig[compileEnv],
};

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log(bundle.imports); // an array of external dependencies
    console.log(bundle.exports); // an array of names exported by the entry point
    console.log(bundle.modules); // an array of module objects

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);

    console.log(code, map);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();

console.timeEnd('compile start----');
