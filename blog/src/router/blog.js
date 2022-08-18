const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../module/resModel');

const handleBlogRouter = (req,res) => {
    const {method, path} = req;
    const id = req.query.id;
    const blogData = req.body;

    if (method === 'GET' && path ===  '/api/blog/list')  {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        return getList(author, keyword).then((data) => {
            return new SuccessModel(data);
        })
    }

    if (method === 'GET' && path ===  '/api/blog/detail')  {
        return getDetail(id).then((data) => {
            return new SuccessModel(data);
        })
    }

    if (method === 'POST' && path ===  '/api/blog/new')  {
        return newBlog(blogData).then((data) => {
            return new SuccessModel(data);
        })
    }

    if (method === 'POST' && path ===  '/api/blog/update')  {
       return  updateBlog(blogData).then((data) => {
            if (data) {
                return new SuccessModel(data);
            } else {
                return new ErrorModel('编辑失败');
            }
        })
    }


    if (method === 'POST' && path ===  '/api/blog/del')  {
        return delBlog(blogData).then((data) => {
            if (data) {
                return new SuccessModel(data);
            } else {
                return new ErrorModel('删除失败');
            }
        });
    }

}

module.exports = handleBlogRouter;
