const fs = require('fs');
const path = require('path');

const access = (log) => {
    const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');
    const writeStream = fs.createWriteStream(fileName, {
        flags: 'a',
    });

    writeStream.write(log + '\n');
};

module.exports = {
    access
}