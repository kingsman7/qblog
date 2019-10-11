export default {
  index: {
    permission: null,
    activated: true,
    authenticated: true,
    path: '/blog',
    name: 'qblog.index',
    page: () => import('@imagina/qblog/_layouts/frontend/index'),
    layout: () => import('src/layouts/master'),
    title: 'Posts',
    icon: 'fas fa-newspaper'
  },
  show: {
    permission: null,
    activated: true,
    authenticated: true,
    path: '/blog/:slugPost',
    name: 'qblog.show',
    page: () => import('@imagina/qblog/_layouts/frontend/show'),
    layout: () => import('src/layouts/master'),
    title: 'Categories',
    icon: 'fas fa-layer-group',
  },
}
