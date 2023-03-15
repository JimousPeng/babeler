import { add } from './add.js';

export const cutdown = (a) => {
    return a - add(a, a + 1);
};
