//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  posts: {
    permission: 'iblog.posts.manage',
    activated: true,
    path: '/blog/posts/index',
    name: 'qblog.admin.posts',
    layout: require('@imagina/qblog/_layouts/admin/posts/index').default,
    containerLayout: master,
    title: 'qblog.sidebar.adminPosts',
    icon: 'fas fa-newspaper',
    middleware: [auth,access]
  },
  categories: {
    permission: 'iblog.categories.manage',
    activated: true,
    path: '/blog/categories/index',
    name: 'qblog.admin.categories',
    layout: require('@imagina/qblog/_layouts/admin/categories/index').default,
    containerLayout: master,
    title: 'qblog.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },

}
