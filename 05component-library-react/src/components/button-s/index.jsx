/*
 * @Date: 2021-12-21 15:45:24
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-01-20 15:45:57
 * @FilePath: \react-components\src\components\button-s\index.jsx
 */

import styles from './index.module.scss'

import React, { useState } from 'react';
const ButtonSave = (props) => {
    let [count, setCount] = useState(8);
    // const count = 9999990000
    return <button className={styles.btn} onClick={() => setCount((count += 1))}>这是一个button{count}</button>;
};

export default ButtonSave