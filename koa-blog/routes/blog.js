const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel } = require('../module/resModel');

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const data = await getList(ctx.query.author, ctx.query.keyword);
  ctx.body = new SuccessModel(data);
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(data);
})

router.post('/new', async (ctx, next) => {
  const data = await newBlog(ctx.request.body);
  ctx.body = new SuccessModel(data);
})

router.post('/update', async (ctx, next) => {
  const data = await updateBlog(ctx.request.body);

  if (data) {
    ctx.body =  new SuccessModel(data);
  } else {
    ctx.body =  new ErrorModel('编辑失败');
  }
})

router.post('/del', async (ctx, next) => {
  const data = await delBlog(ctx.request.body);
  if (data) {
    ctx.body = new SuccessModel(data);
  } else {
    ctx.body = new ErrorModel('删除失败');
  }
})

module.exports = router
