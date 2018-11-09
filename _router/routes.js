import Route from 'vue-routisan'
import configSrc from 'src/config/index'//Import config for views and routes fron src
import configModule from '@imagina/qblog/_config/views'//Import config for views and routes fron module

//Get Layout about config location
const getLayout = (route) => {
  if (route.location.module) {
    return require('@imagina/qblog/_layouts/' + route.layout).default
  } else {
    return require('src/layouts/' + route.layout).default
  }
}

//Define config
const configBlog = configSrc('views').qblog ? configSrc('views').qblog : configModule

//Create route about config/views/qblog
for (var item in configBlog) {
  let route = configBlog[item]
  let children = route.children

  //Create routes master
  Route.view(route.route, getLayout(route))
    .children(() => {
      //Create routes children
      children.forEach(route => {
        Route.view(route.route, getLayout(route))
      })
    })
}

export default Route.all()
