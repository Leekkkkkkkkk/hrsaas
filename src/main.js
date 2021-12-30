import Vue from 'vue' // 引入vue.js

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui' // 引入 element-ui
// import 'element-ui/lib/theme-chalk/index.css' // 引入 element-ui css
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n //引入国际化语言包

import '@/styles/index.scss' // global css

import App from './App' // 根组件
import store from './store' // vuex
import router from './router' // 路由
import Print from 'vue-print-nb'
// Global instruction
Vue.use(Print)

import '@/icons' // icon
import '@/permission' // permission control
import Lui from '@/components'
Vue.use(Lui)
import * as filters from '@/filter/index'
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

import i18n from '@/lang/index'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
