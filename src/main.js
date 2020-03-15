import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import './api/element'
import './api/loading'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(async config => {
  // console.log(window.sessionStorage.getItem('token'))
  config.headers.Authorization = await window.sessionStorage.getItem('token')
  // console.log(config)
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
