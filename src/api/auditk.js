import request from '@/utils/request'

export function getSearchCount(data) {
  return request({
    url: '/index/selectYwMarkingCompeCount',
    method: 'post',
    params: data
  })
}

export function getAuditkResultList(data) {
  return request({
    url: '/index/selectYwTrialNumber',
    method: 'post',
    params: data
  })
}

export function getAuditkList(data) {
  return request({
    url: '/index/selectYwTrialNumberList',
    method: 'post',
    params: data
  })
}
export function getAuditkFindList(data) {
  return request({
    url: '/index/selectFindList',
    method: 'post',
    params: data
  })
}
