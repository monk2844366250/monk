import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 注册一个全局自定义指令 `v-reClick`
Vue.directive('reClick', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 5000)
      }
    })
  }
})

import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
