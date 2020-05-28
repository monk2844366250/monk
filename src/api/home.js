import request from '@/utils/request'

export function getBanner() {
    return request({
        url: 'common/getBanner',
        method: 'get',
        params:{}
    })
}


export function getContact() {
    return request({
        url: 'common/getContact',
        method: 'get',
        params:{}
    })
}
export function getCustomer() {
    return request({
        url: 'common/getCustomer',
        method: 'post',
        params:{}
    })
}

export function setCooperation(data) {
    return request({
        url: 'common/setCooperation',
        method: 'post',
        params:data
    })
}
export function getSmsCode(data) {
    return request({
        url: 'common/getSmsCode',
        method: 'post',
        params:data
    })
}
