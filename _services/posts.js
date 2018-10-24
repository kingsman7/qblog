import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"

export default {

  /**
   * Get posts by parameters
   * @param parameters
   * @returns {Promise<any>}
   */
  index(parameters) {
    parameters ? true : parameters = []

    return new Promise((resolve, reject) => {
      http.get(config('api.api_url') + '/iblog/posts',{params: parameters})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject([]);
        })
    });
  },

  /**
   * Get post by id or slug
   * @param slug
   * @param include
   * @returns {Promise<any>}
   */
  show(slug,include){
    include ? true : include = []

    return new Promise((resolve, reject) => {
      http.get(config('api.api_url') + '/iblog/posts/'+slug,{params: {
          include : (include ? include : [])
        }})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject([]);
        })
    });
  }

}
