import axios from 'axios'
import config from 'lazy-config'

const baseUrl = config.api.mikan.baseUrl

export default {
  Query: {
    anime: async (root, args) => {
      let { id } = args
      console.log('resolving anime/' + id)
      return axios
        .get(baseUrl + '/anime/' + id)
        .then(response => {
          return response.data
        })
        .catch(err => {
          console.error(err)
          return null
        })
    },
    search: async (root, args) => {
      let { name } = args
      console.log('resolving search/' + name)

      return axios
        .get(baseUrl + '/search/' + name)
        .then(response => {
          return response.data.result
        })
        .catch(err => {
          console.error(err)
          return null
        })
    }
  }
}
