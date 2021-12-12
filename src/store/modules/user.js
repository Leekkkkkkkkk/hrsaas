import { login, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: []
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}
const actions = {
  async login(context, payload) {
    try {
      const res = await login(payload)
      context.commit('setToken', res)
    } catch (err) {
      console.log(err)
    }
  },
  async getUserInfo(context, payload) {
    // 获取用户信息
    const res = await getUserInfo()
    context.commit('setUserInfo', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

