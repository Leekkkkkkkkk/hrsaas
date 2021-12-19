import store from '@/store'
import router from '@/router'
router.beforeEach(async(to, form, next) => {
  const token = store.state.user.token
  const nextTo = ['/login', '/404']
  const nextTrue = nextTo.includes(to.path)
  // console.log(token)
  if (token) {
    if (to.path === '/login') return next('/')
    await store.dispatch('user/getUserInfo')
    next()
  } else {
    if (nextTrue) {
      next()
    } else {
      next('/login')
    }
  }
})
