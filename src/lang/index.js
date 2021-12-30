import Vue from 'vue' // 引入vue.js
import VueI18n from 'vue-i18n'
import zh from './message/zh'
import en from './message/en'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en', // 设置地区
  messages: {
    zh,
    en
  } // 设置地区信息
})
export default i18n
