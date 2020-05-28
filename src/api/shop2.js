import request from '@/utils/request'

// 我的推广
export function extendLink(data) {
  return request({
    url: 'business/getBusinessInviteCode',
    method: 'post',
    params: data
  })
}
// 黑名单 列表
export function blackList(data) {
  return request({
    url: 'business/selectYwBusinessBlackList',
    method: 'post',
    params: data
  })
}
// 黑名单 添加
export function AddBlack(data) {
  return request({
    url: 'business/addYwBusinessBlackList',
    method: 'post',
    params: data
  })
}
// 黑名单 删除
export function removeYwBlack(data) {
  return request({
    url: 'business/removeYwBusinessBlackList',
    method: 'post',
    params: data
  })
}

// 意见反馈 列表
export function feedbackList(data) {
  return request({
    url: 'business/selectYwFeedbackList',
    method: 'post',
    params: data
  })
}
// 意见反馈 添加
export function addFeedback(data) {
  return request({
    url: 'business/addYwFeedback',
    method: 'post',
    params: data
  })
}
// 意见反馈 详情
export function feedbackDetail(data) {
  return request({
    url: 'business/getYwFeedback',
    method: 'post',
    params: data
  })
}
// 意见反馈 回复
export function feedbackReply(data) {
  return request({
    url: 'business/addYwFeedbackReply',
    method: 'post',
    params: data
  })
}
// 意见反馈 删除
export function removeFeedback(data) {
  return request({
    url: 'business/removeYwFeedback',
    method: 'post',
    params: data
  })
}

