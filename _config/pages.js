//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  posts: {
    permission: 'iblog.posts.manage',
    activated: true,
    path: '/qblog/posts/index',
    name: 'app.iblog.posts.index',
    layout: require('@imagina/qblog/_layouts/admin/posts/index').default,
    containerLayout: master,
    title: 'Posts',
    icon: 'fas fa-newspaper',
    middleware: [auth,access]
  },
  
  
  categories: {
    permission: 'iblog.categories.manage',
    activated: true,
    path: '/qblog/categories/index',
    name: 'app.iblog.categories.index',
    layout: require('@imagina/qblog/_layouts/admin/categories/index').default,
    containerLayout: master,
    title: 'Categories',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },

}
