import store from '@/store'
import router from '@/router'
router.beforeEach(async(to, form, next) => {
  const token = store.state.user.token
  const nextTo = ['/login', '/404']
  const nextTrue = nextTo.includes(to.path)
  // console.log(token)
  if (token) {
    if (to.path === '/login') return next('/')
    if (store.state.user.userInfo.id) {
      next()
    } else {
      const { roles } = await store.dispatch('user/getUserInfo')
      store.dispatch('permission/filterRoute', roles)
      console.log(roles)
      next({
        ...to, // next({...to})的目的,是保证路由添加完了再进入页面(可以理解为重进一次)
        replace: true // 重进一次,不保留重复历史
      })
      // next(to.path)
    }
  } else {
    if (nextTrue) {
      next()
    } else {
      next('/login')
    }
  }
})
