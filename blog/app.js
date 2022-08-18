const querystring = require('querystring');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { access } = require('./src/utils/log');
// const { set, get } = require('./src/db/redis');

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

// 处理post请求
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }

        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }

            resolve(JSON.parse(postData));
        });
    });

    return promise;
};

const serverHandle = (req, res) => {
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    res.setHeader('Content-type', 'application/json');
    const { url } = req;
    const path = url.split('?')[0];

    req.path = path;
    req.query = querystring.parse(url.split('?')[1]);
    req.cookie = {};

    // const cookieStr = req.headers.cookie || '';
    // cookieStr.split(';').forEach((item) => {
    //     if (!item) {
    //         return;
    //     }
    //     const key = item.split('=')[0].trim();
    //     const value = item.split('=')[1].trim();
    //     req.cookie[key] = value;
    // });
    // let needSetCookie = false;
    // let userId = req.cookie.userId;
    // if (!userId) {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     set(userId, {});
    // }
    // req.sessionId = userId;

    // get(req.sessionId).then((sessionData) => {
    //     if (sessionData == null) {
    //         set(req.sessionId, {});
    //         req.session = {};
    //     } else {
    //         req.session = sessionData;
    //     }

    //     return getPostData(req)
    // }).then
    getPostData(req).then((postData) => {
            req.body = postData;

            const blogData = handleBlogRouter(req, res);
            if (blogData) {
                blogData.then((data) => {
                    // if (needSetCookie) {
                    //     res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    // }

                    if (data) {
                        res.end(JSON.stringify(data));
                    }
                });

                return;
            }


            const userData = handleUserRouter(req, res);
            if (userData) {
                userData.then((userData) => {
                    // if (needSetCookie) {
                    //     res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    // }

                    if (userData) {
                        res.end(JSON.stringify(userData));
                    }
                });

                return;
            }

            res.writeHead(404, { 'Content-type': 'text/plain' });
            res.write('404');
            res.end();
    })
};

module.exports = serverHandle;
