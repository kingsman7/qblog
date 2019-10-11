export default {
  posts: {
    permission: 'iblog.posts.manage',
    activated: true,
    authenticated: true,
    path: '/blog/posts/index',
    name: 'qblog.admin.posts',
    page: () => import('@imagina/qblog/_layouts/admin/posts/index'),
    layout: () => import('src/layouts/master'),
    title: 'qblog.sidebar.adminPosts',
    icon: 'fas fa-newspaper',
  },
  categories: {
    permission: 'iblog.categories.manage',
    activated: true,
    authenticated: true,
    path: '/blog/categories/index',
    name: 'qblog.admin.categories',
    page: () => import('@imagina/qblog/_layouts/admin/categories/index'),
    layout: () => import('src/layouts/master'),
    title: 'qblog.sidebar.adminCategories',
    icon: 'fas fa-layer-group'
  },

}
