const router = require('koa-router')()
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../module/resModel');
const { escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const name = escape(username);
  // 加密
  const genpsd = genPassword(password);
  // 转义
  const psd = escape(genpsd);
  const data = await login(name, psd);

  if (data) {
    ctx.body = new SuccessModel(data);
  } else {
    ctx.body = new ErrorModel('登录失败');
  }
})

module.exports = router
