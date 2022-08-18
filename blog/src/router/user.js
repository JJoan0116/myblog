const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../module/resModel');
const { escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');
// const { set } = require('../db/redis');

const handleUserRouter = (req,res) => {
    const {method, path} = req;

    if (method === 'GET' && path ===  '/api/user/login')  {
          const { username, password } = req.query;
          const name = escape(username);
          const genpsd = genPassword(password);
          const psd = escape(genpsd);

          return login(name, psd).then((data) => {
               if (data) {
                    if (data.username) {
                         // req.session.username = data.username;
                         // req.session.realname = data.realname;
                         // set(req.sessionId, req.session);
                         // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
                         return new SuccessModel(data);
                    }
               } else {
                    return new ErrorModel('登录失败');
               }
          })
    }
}

module.exports = handleUserRouter;