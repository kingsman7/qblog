import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"

export default {

  /**
   * Get Categories by parameters
   */
  index(parameters) {
    parameters ? true : parameters = []

    return new Promise((resolve, reject) => {
      http.get(config('api.api_url') + '/iblog/categories',{params: parameters})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject([]);
        })
    });
  },

  /**
   * Get category by slug
   * @param slug
   * @param include
   */
  show(slug, include){
    include ? true : include = []

    return new Promise((resolve, reject) => {
      http.get(config('api.api_url') + '/iblog/categories/'+slug,{params: {
          include : (include ? include : [])
        }})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject([]);
        })
    });
  },

}
