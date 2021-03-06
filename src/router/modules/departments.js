import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  name: 'departments',
  children: [
    {
      path: '',
      component: () => import('@/views/departments/index'),
      meta: { title: '组织架构', icon: 'tree' },
      name: 'departments'
    }
  ]
}
