import axios from 'axios'
import { Loading, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import md5 from 'js-md5'
import qs from 'qs'
// create an axios instance

// const service = axios.create({
//   baseURL: 'http://192.168.1.20:82/api/', // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 20000 // request timeout
// })

// const service = axios.create({
//   baseURL: 'https://web.dxer168.com/api/', // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 20000 // request timeout
// })

const service = axios.create({
  baseURL: 'http://193.112.147.210:82/api/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

var loadingInstance
function objKeySort(obj) { // 排序的函数
  var newkey = Object.keys(obj).sort()
  var newObj = {}// 创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) { // 遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]// 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj// 返回排好序的新对象
}
function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null || obj === '' && obj !== 0) {
    return true
  } else {
    return false
  }
}
var self = this
// request interceptor
service.interceptors.request.use(
  // loading等待
  config => {
    // do something before request is sent
    var code = ''
    loadingInstance = Loading.service({
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0)',
      text: 'Loading'
    })
    // loadingInstance = Loading.service({
    //   lock: true,
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)',
    //   text: 'Loading'
    // })
    // token
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      if (!config.params) { config.params = {} }
      const timestamp = Date.parse(new Date()) / 1000
      config.params.token = getToken()
      var sortParams = objKeySort(config.params)
      for (const key in sortParams) {
        if (!isEmpty(sortParams[key])) {
          code += key + '=' + sortParams[key] + '&'
        } else {
          delete config.params[key]
        }
      }
      code += 'appkey=' + process.env.VUE_APP_KEY + '&timestamp=' + timestamp
      const sign = md5(code).toUpperCase()
      config.params.timestamp = timestamp
      config.params.sign = sign
    } else {
      if (!config.params) { config.params = {} }
      const timestamp = Date.parse(new Date()) / 1000
      var sortParams = objKeySort(config.params)
      for (const key in sortParams) {
        if (!isEmpty(sortParams[key])) {
          code += key + '=' + sortParams[key] + '&'
        } else {
          delete config.params[key]
        }
      }
      code += 'appkey=' + process.env.VUE_APP_KEY + '&timestamp=' + timestamp
      const sign = md5(code).toUpperCase()
      config.params.timestamp = timestamp
      config.params.sign = sign
    }
    config.paramsSerializer = function(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    setTimeout(() => {
      loadingInstance.close()
    }, 0)
    const res = response.data
    // 修改loading时间
    // response => {
    //   setTimeout(() => {
    //     loadingInstance.close();
    //   }, 800)
    //   const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    return res
    // }
  },
  error => {
    setTimeout(() => {
      loadingInstance.close()
    }, 0)
    // error => {
    //   setTimeout(() => {
    //     loadingInstance.close()
    //   }, 800)
    console.log('err' + error) // for debug
    const { config, code, message } = error
    if (code === 'ECONNABORTED' || message === 'Network Error') { // 请求超时
      Message({
        message: '网络超时，请稍后重试',
        type: 'warning',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'warning',
        duration: 5 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service
