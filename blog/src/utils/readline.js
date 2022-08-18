const path = require('path');
const fs = require('fs');
const readline = require('readline');

const fileName = path.join(__dirname, '../', '../', 'logs/access.log');
const readStream = fs.createReadStream(fileName);
const rl = readline.createInterface({
    input: readStream,
});

let chromeNum = 0;
let total = 0;

rl.on('line', (lineData) => {
    if (!lineData) {
        return;
    }

    total++;
    const arr = lineData.split(' -- ')

    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++;
    }
});

rl.on('close', () => {
    console.log('chromeNum ====> ', chromeNum, 'total ====> ', total)
})
