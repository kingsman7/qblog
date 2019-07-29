//Layout container
import master from 'src/layouts/master'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  index: {
    permission: null,
    activated: true,
    path: '/blog',
    name: 'qblog.index',
    layout: require('@imagina/qblog/_layouts/frontend/index').default,
    containerLayout: master,
    title: 'Posts',
    icon: 'fas fa-newspaper',
    middleware: [auth,access]
  },
  show: {
    permission: null,
    activated: true,
    path: '/blog/:slugPost',
    name: 'qblog.show',
    layout: require('@imagina/qblog/_layouts/frontend/show').default,
    containerLayout: master,
    title: 'Categories',
    icon: 'fas fa-layer-group',
    middleware: [auth,access]
  },
}
