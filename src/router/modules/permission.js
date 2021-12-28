import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  name: 'permission',
  children: [
    {
      path: '',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限', icon: 'lock' }
    }
  ]
}
