import router, { varRoutes, constantRoutes } from '@/router'
const state = {
  // 为了存当前用户拥有的路由
  routes: [],
  point: {
    userAdd: 'POINT-USER-ADD',
    userUpdate: 'POINT-USER-UPDATE',
    userZz: 'POINT-USER-ZZ',
    userDel: 'POINT-USER-DELETE',
    rolesDel: 'POINT-ROLES-DELETE'
  }
}

const mutations = {
  setRoutes(state, payload) {
    state.routes = payload
  }
}
const actions = {
  filterRoute(context, roles) {
    const filterRouter = varRoutes.filter(item => roles.menus.includes(item.name))
    console.log(filterRouter)
    router.addRoutes([...filterRouter, { path: '*', redirect: '/404', hidden: true }])
    context.commit('setRoutes', [...constantRoutes, ...filterRouter])
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
