import Vue from 'vue' // 引入vue.js

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui' // 引入 element-ui
import 'element-ui/lib/theme-chalk/index.css' // 引入 element-ui css
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n //引入国际化语言包

import '@/styles/index.scss' // global css

import App from './App' // 根组件
import store from './store' // vuex
import router from './router' // 路由

import '@/icons' // icon
import '@/permission' // permission control

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
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
