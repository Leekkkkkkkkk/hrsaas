// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
}) // 创建一个axios的实例
request.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + store.state.user.token
  return config
}) // 请求拦截器
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
  console.dir(err)
  Message.error('服务器异常')
  return Promise.reject(err)
}) // 响应拦截器
export default request // 导出axios实例
