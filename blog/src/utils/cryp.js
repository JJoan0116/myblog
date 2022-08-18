const crypto = require('crypto');

const SECRET_KEY = 'myblog_123456';

const genPassword = (password) => {
    const str = `password=${password}&key=${SECRET_KEY}`;
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');

};

module.exports = {
    genPassword,
};