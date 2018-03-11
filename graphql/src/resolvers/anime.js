import axios from 'axios'
import config from 'lazy-config'

import db from '../db'

const baseUrl = config.api.mikan.baseUrl

export default async function anime(root, args) {
  let { id } = args

  let cachedAnime = await db.findAnime(id)
  if (cachedAnime) {
    console.log('Returning cached anime: ' + cachedAnime.title)
    return cachedAnime
  }

  console.log('Requesting anime ' + id)
  return axios
    .get(baseUrl + '/anime/' + id)
    .then(response => {
      db.insertAnime(response.data)
      return response.data
    })
    .catch(err => {
      db.deleteAnime(id)
      console.error(err.message)
      return null
    })
}
