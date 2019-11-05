export default {
  index: {
    permission: null,
    activated: true,
    authenticated: true,
    path: '/blog',
    name: 'qblog.index',
    page: () => import('@imagina/qblog/_pages/frontend/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'Posts',
    icon: 'fas fa-newspaper'
  },
  show: {
    permission: null,
    activated: true,
    authenticated: true,
    path: '/blog/:slugPost',
    name: 'qblog.show',
    page: () => import('@imagina/qblog/_pages/frontend/show'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'Categories',
    icon: 'fas fa-layer-group',
  },
}
