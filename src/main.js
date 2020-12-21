import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import '@/assets/icon/iconfont.css'

require("echarts/lib/component/visualMap")
require("echarts/lib/component/geo")
require("echarts/map/js/world")
Vue.config.productionTip = false
Vue.prototype.$axios = axios

//axios.defaults.baseURL = 'api/';

new Vue({
  render: h => h(App),
}).$mount('#app')
