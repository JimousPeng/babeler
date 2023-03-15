import { add } from './add.js';

export const calculate = (a) => {
    return a + add(a, a + 1);
};
