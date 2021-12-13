// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'
// 创建一个axios的实例
const timeOut = 2 * 60 * 60 * 1000
// const timeOut = 20 * 1000
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
// 请求拦截器
request.interceptors.request.use((config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      store.commit('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录已失效'))
    }
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})
// 响应拦截器
request.interceptors.response.use((res) => {
  const { success, message, data } = res.data
  // console.log(res)
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (err) => {
  if (err.response && err.response.status === 401) {
    Message.error('登录已失效')
    store.commit('user/logout')
    router.push('/login')
  } else {
    Message.error(err.message)
  }
  return Promise.reject(err)
})
// 封装返回true or false
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const time = currentTime - tokenTime
  return time >= timeOut
}
export default request // 导出axios实例
