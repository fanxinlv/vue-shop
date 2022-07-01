import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TreeTable from 'vue-table-with-tree-grid'

Vue.use(ElementUI);
Vue.component('tree-table', TreeTable)

Vue.config.productionTip =false

axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
  console.log(config)
  return config
})
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
