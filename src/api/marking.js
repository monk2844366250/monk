import request from '@/utils/request'



//新增打标记录
export function addYwMarkingCompe(data) {
    return request({
        url: 'index/addYwMarkingCompe',
        method: 'post',
        params:data
    })
}
//新增超级打标记录
export function addYwMarkingSuper(data) {
    return request({
        url: 'index/addYwMarkingSuper',
        method: 'post',
        params:data
    })
}

//查询剩余次数
export function selectYwTrialNumber(data) {
    return request({
        url: 'index/selectYwMarkingCompeCount',
        method: 'post',
        params:data
    })
}

//打标记录列表
export function selectYwMarkingCompeList(data) {
    return request({
        url: 'index/selectYwMarkingCompeList',
        method: 'post',
        params:data
    })
}



