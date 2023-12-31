import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { mockXHR } from '../mock'

import 'normalize.css'
import './styles/index.scss'
import './icons'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

mockXHR()

import './router/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
