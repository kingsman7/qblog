export default {
  posts: {
    permission: 'iblog.posts.manage',
    activated: true,
    authenticated: true,
    path: '/blog/posts/index',
    name: 'qblog.admin.posts',
    crud : import('@imagina/qblog/_crud/posts'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qblog.sidebar.adminPosts',
    icon: 'fas fa-newspaper',
    subHeader: {
      refresh: true,
    }
  },
  categories: {
    permission: 'iblog.categories.manage',
    activated: true,
    authenticated: true,
    path: '/blog/categories/index',
    name: 'qblog.admin.categories',
    crud : import('@imagina/qblog/_crud/categories'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qblog.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
    subHeader: {
      refresh: true,
    }
  },

}
