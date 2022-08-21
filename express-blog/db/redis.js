const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
    console.log('redis', err);
});

const set = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }

    redisClient.set(key, val);
};

const get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                redis(err);
                return;
            }

            if (val == null) {
                reject(null);
                return;
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch(ex) {
                resolve(val)
            }
        })
    });
}

module.exports = {
    set,
    get,
}