import request from '@/utils/request'

export function getCosToken(data) {
  return request({
    url: '/common/getCosToken',
    method: 'get',
    params:data
  })
}
export function getBankList(data) {
  return request({
    url: '/index/selectBankList',
    method: 'get',
    params:data
  })
}
export function getDepositList(data) {
  return request({
    url: '/index/selectYwCapitalAuditList',
    method: 'post',
    params:data
  })
}
export function addDeposit(data) {
  return request({
    url: '/index/addYwCapitalAudit',
    method: 'post',
    params:data
  })
}
export function getReceivablesInfo(data) {
  return request({
    url: '/index/selectReceivableslConfig',
    method: 'post',
    params:data
  })
}
