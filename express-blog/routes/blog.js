var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../module/resModel');

/* GET users listing. */
router.get('/list', function(req, res, next) {
    // res.send('list');
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    getList(author, keyword).then((data) => {
        // return new SuccessModel(data);
        res.json(
            new SuccessModel(data)
        )
    })
});

router.get('/detail', function(req, res, next) {
    res.send('detail');
});

router.post('/new', function(req, res, next) {
    res.send('new');
});

router.post('/update', function(req, res, next) {
    res.send('update');
});

router.post('/del', function(req, res, next) {
    res.send('del');
});

module.exports = router;
