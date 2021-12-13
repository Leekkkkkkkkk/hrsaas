import { login, getUserInfo, getUserInfoById } from '@/api/user'
import { setToken, getToken, removeToken, setTokenTime } from '@/utils/auth'
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
  },
  logout(state, payload) {
    state.token = null
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  async login(context, payload) {
    try {
      const res = await login(payload)
      setTokenTime()
      context.commit('setToken', res)
    } catch (err) {
      console.log(err)
    }
  },
  async getUserInfo(context, payload) {
    // 获取用户信息
    const res = await getUserInfo()
    const userInfo = await getUserInfoById(res.userId)
    context.commit('setUserInfo', { ...res, ...userInfo })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

