const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
    // console.log(req.sessionId);
    if(!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登陆')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method //GET POST
    const id = req.query.get('id')
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.get('author') || ''
        const keyword = req.query.get('keyword') || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        if(req.query.get('isadmin')) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }
        const result = getList(author,keyword)
        return result.then(listData=> {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const detailData = getDetail(id)
        // return new SuccessModel(detailData)
        const result = getDetail(id)
        return result.then(detailData=> {
            return new SuccessModel(detailData)
        })
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        req.body.author=req.session.username
        const result = newBlog(req.body)
        return result.then(data=> {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const result = updateBlog(id,req.body)
        return result.then(val=> {
            if(val){
                return new SuccessModel()
            }else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const author = req.session.username
        const result = delBlog(id,author)
        return result.then(val=> {
            if(val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('删除博客失败')
            }
        })
        // const result = delBlog(id)
        // if(result){
        //     return new SuccessModel()
        // }else {
        //     return new ErrorModel('删除博客失败')
        // }
    }
}

module.exports = handleBlogRouter