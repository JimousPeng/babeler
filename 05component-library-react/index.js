/*
 * @Date: 2021-12-01 13:14:25
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2021-12-21 15:18:00
 * @FilePath: \react-components\src\index.js
 */
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
} = require('tapable');

const syHook = new SyncBailHook(['arg1']);

syHook.tap('a', (data) => {
    console.log('a: jimous2', data);
    return 'hhh'
    // data += 1
})

syHook.tap('b', (data) => {
    console.log('b: jimous1', data)
})

syHook.call(12, 16)