const fs = require('fs');
const path = require('path');
const readline = require('readline');

//文件名
const filename = path.join(__dirname, '../', '../', 'logs', 'access.log');
//创建readStream
const readStream = fs.createReadStream(filename);

//创建一个readline对象
const rl = readline.createInterface({
    input: readStream
    
})

let chromeNum = 0;
let sum = 0;

//逐行读取
rl.on('line', lineData => {
    if (!lineData) {
        return 
    }

    //记录总行数
    sum++;

    const arr = lineData.split(' -- ');
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++;
    }
})

rl.on('close', () => {
    console.log('chrome占比:'+chromeNum/sum);
    
})