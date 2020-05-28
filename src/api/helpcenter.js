import request from '@/utils/request'

export function helpFindList(data) {
  return request({
    url: '/help/findList',
    method: 'get',
    params: data
  })
}
export function helpGet(data) {
  return request({
    url: '/help/get',
    method: 'get',
    params: data
  })
}

