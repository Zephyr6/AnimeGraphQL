import axios from 'axios'
import config from 'lazy-config'

const baseUrl = config.api.anime.baseUrl

export default async function search(root, args) {
  let { name } = args
  console.log('resolving search/' + name)

  return axios
    .get(baseUrl + '/search/anime/' + name)
    .then(response => {
      return response.data.result
    })
    .catch(err => {
      console.error(err)
      return null
    })
}
