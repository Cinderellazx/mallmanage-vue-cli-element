// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import HTTPTool from '@/plugin/http.js'
import App from './App'
import router from './router'
import '@/assets/css/index.css'

Vue.use(ElementUI)
Vue.use(HTTPTool)

Vue.filter('fmtData', function (v) {
  return moment.unix(v).format('YYYY-MM-DD hh:mm:ss')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
