import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'business/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: 'business/getBusinessByToken',
    method: 'post',
    params: { token }
  })
}
export function register(data) {
  return request({
    url: 'business/register',
    method: 'post',
    params: data
  })
}

export function forgetPwd(data) {
  return request({
    url: 'business/forgetPwd',
    method: 'post',
    params:data
  })
}

export function editPwd(data) {
  return request({
    url: 'business/editPwd',
    method: 'post',
    params:data
  })
}

export function getSmsCodeByImgCode(data) {
  return request({
    url: 'common/getSmsCodeByImgCode',
    method: 'post',
    params:data
  })
}

export function getCaptcha() {
  return request({
    url: 'common/getImageCaptcha',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return request({
    url: 'business/loginOut',
    method: 'post'
  })
}
