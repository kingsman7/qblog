import router from 'src/router/index';
import config from 'src/config/index'
import axios from 'axios';

/*Services*/
import categoriesServices from '@imagina/qblog/_services/categories'
import postsServices from '@imagina/qblog/_services/posts'

/*======================== BLOG ===================================*/
/**
 *
 * Defined if dispath Post or Category
 * @param commit
 * @param dispatch
 * @param url
 * @returns {Promise<any>}
 * @constructor
 */
export const BLOG_SHOW = ({commit, dispatch}, route) => {
  return new Promise((resolve, reject) => {
    //Get parameters from URL
    let slugCategory = route.params.slugCategory
    let slugPost = route.params.slugPost

    if(slugPost){//Dispatch POST SHOW if exist parameter slug post
      let include = 'categories'//Relationships

      dispatch('POST_SHOW',{slug : slugPost, include: include}).then(response => {
        commit('BLOG_SUCCESS', {dataIblog : {value: response.data}})
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    }else{//Dispatch CATEGORY SHOW if exist parameter slug category
      let include = 'children,parent,posts'//Relationships

      dispatch('CATEGORY_SHOW',{slug : slugCategory, include : include}).then(response => {
        commit('BLOG_SUCCESS', {dataIblog : {value : response.data}})
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    }
  })
}


/*======================== CATEGORIES ===================================*/
/**
 * Request categories by parameteres
 * @param commit
 * @param dispatch
 * @param parameters
 * @returns {Promise<any>}
 * @constructor
 */
export const CATEGORY_INDEX = ({commit, dispatch}, parameters) => {
  return new Promise((resolve, reject) => {
    //Request categories by slug
    categoriesServices.index(parameters).then((response) => {
      response ? commit('BLOG_SUCCESS', {categories : {value: response.data}}) : false
      resolve(response)
    }).catch((error) => {
      reject(error)
    })

  })
}

/**
 * Request category by slug
 * @param commit
 * @param dispatch
 * @param route
 * @returns {Promise<any>}
 * @constructor
 */
export const CATEGORY_SHOW = ({commit, dispatch}, prmt) => {
  return new Promise((resolve, reject) => {
    prmt.include ? true : prmt.include = ''//Includes

    categoriesServices.show(prmt.slug, prmt.include).then((response) => {
      response ? commit('BLOG_SUCCESS', {category : {value: response.data}}) : false
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}


/*======================== POSTS ===================================*/
/**
 * Request Data POSTS by parameters
 * @param commit
 * @param dispatch
 * @param route
 * @returns {Promise<any>}
 * @constructor
 */
export const POST_INDEX = ({commit, dispatch}, parameters) => {
  return new Promise((resolve, reject) => {
    postsServices.index(parameters).then((response) => {
      console.warn('>>>>>Post: ',response,parameters)
      response ? commit('BLOG_SUCCESS', {posts : {value: response.data}}) : false
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Request data POST by SLUG
 * @param commit
 * @param dispatch
 * @param slug
 * @returns {Promise<any>}
 * @constructor
 */
export const POST_SHOW = ({commit, dispatch}, prmt) => {
  return new Promise((resolve, reject) => {
    prmt.include ? true : prmt.include = ''//Includes

    postsServices.show(prmt.slug, prmt.include).then((response) => {
      response ? commit('BLOG_SUCCESS', {post : {value: response.data}}) : false
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}
