import request from '@/utils/request'



//文章列表
export function selectArticleList(data) {
    return request({
        url: 'index/selectArticleList',
        method: 'post',
        params:data
    })
}


//文章详情
export function selectArticleById(data) {
    return request({
        url: 'index/selectArticleById',
        method: 'post',
        params:data
    })
}
//文章点赞
export function addYwArticlePraise(data) {
    return request({
        url: 'index/addYwArticlePraise',
        method: 'post',
        params:data
    })
}

//评论列表
export function selectYwArticleCommentList(data) {
    return request({
        url: 'index/selectYwArticleCommentList',
        method: 'post',
        params:data
    })
}




//评论
export function addYwArticleComment(data) {
    return request({
        url: 'index/addYwArticleComment',
        method: 'post',
        params:data
    })
}


//评论点赞
export function addYwArticleCommentPraise(data) {
    return request({
        url: 'index/addYwArticleCommentPraise',
        method: 'post',
        params: data
    })
}
