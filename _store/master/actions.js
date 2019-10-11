/*Services*/
import crud from '@imagina/qcrud/_services/baseService'

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

    if (slugPost) {//Dispatch POST SHOW if exist parameter slug post
      let include = 'categories'//Relationships

      dispatch('POST_SHOW', {slug: slugPost, include: include}).then(response => {
        commit('BLOG_SUCCESS', {dataIblog: {value: response}})
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    } else {//Dispatch CATEGORY SHOW if exist parameter slug category
      let include = 'children,posts'//Relationships

      dispatch('CATEGORY_SHOW', {slug: slugCategory, include: include}).then(response => {
        commit('BLOG_SUCCESS', {dataIblog: {value: response}})
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
export const CATEGORY_INDEX = ({commit, dispatch}, params) => {
  return new Promise((resolve, reject) => {
    //Request categories by slug
    crud.index('apiRoutes.qblog.categories', params).then((response) => {
      //Validate if make commit
      if (response && !params.noCommit) {
        commit('BLOG_SUCCESS', {categories: {value: response.data}})
      }

      resolve(response.data)
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
export const CATEGORY_SHOW = ({commit, dispatch}, params) => {
  return new Promise((resolve, reject) => {
    params.include ? true : params.include = ''//Includes

    crud.show('apiRoutes.qblog.categories', params.slug, params.include).then((response) => {
      //Validate if make commit
      if (response && !params.withoutCommit) {
        commit('BLOG_SUCCESS', {category: {value: response.data}})
      }

      resolve(response.data)
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
export const POST_INDEX = ({commit, dispatch}, params) => {
  return new Promise((resolve, reject) => {
    crud.index('apiRoutes.qblog.posts', params).then((response) => {
      //Validate if make commit
      if (response && !params.withoutCommit) {
        commit('BLOG_SUCCESS', {posts: {value: response.data}})
      }

      resolve(response.data)
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
export const POST_SHOW = ({commit, dispatch}, params) => {
  return new Promise((resolve, reject) => {
    crud.show('apiRoutes.qblog.posts', params.slug, params.request).then((response) => {
      //Validate if make commit
      if (response && !params.withoutCommit) {
        commit('BLOG_SUCCESS', {post: {value: response.data}})
      }

      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}


/*======================== WIDGETS ===================================*/
export const WIDGETS = ({commit, dispatch}, data) => {
  return new Promise((resolve, reject) => {
    //dispath actions without make commit
    data.params.noCommit = true

    //Request Data
    dispatch(data.action, data.params).then(dataWidget => {
      //Save data in state
      commit('BLOG_SUCCESS', {widgets: {key: data.key, value: dataWidget}})
      resolve(dataWidget)
    }).catch(error => {
    })
  })
}


//Get product and set as current product
export function GET_POST({commit}, slug) {
  return new Promise((resolve, reject) => {
    let paramsRequest = {refresh: true,params : {filter : {field : 'slug'}}}

    if (slug){
      crud.show('apiRoutes.qblog.posts', slug, paramsRequest).then(response => {
        commit('SET_POST', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    }
    else
      reject('slug is required')
  })
}

//Get product and set as current product
export function GET_CATEGORY({commit}, slug) {
  return new Promise((resolve, reject) => {
    let paramsRequest = {refresh: true,params : {filter : {field : 'slug'}}}

    if (slug){
      crud.show('apiRoutes.qblog.categories', slug, paramsRequest).then(response => {
        commit('SET_CATEGORY', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    }
    else
      reject('slug is required')
  })
}
