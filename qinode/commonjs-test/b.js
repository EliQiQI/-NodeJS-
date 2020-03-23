const { add, mul } = require('./a')
const _=require('lodash')
const sum = add(10, 20);
const plus = mul(10, 20);
console.log(`${sum}-${plus}`);
const arr = _.concat([1, 2], 3);
console.log(`arr:${arr}`);
