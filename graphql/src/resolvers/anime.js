import axios from 'axios'
import config from 'lazy-config'

import db from '../db'

const baseUrl = config.api.mikan.baseUrl

export default async function anime(root, args) {
  let { id } = args

  // Try to get a cached anime before sending a request to the external API
  let cachedAnime = await db.findAnime(id)
  if (cachedAnime) {
    console.log('Returning cached anime: ' + cachedAnime.title)
    return cachedAnime
  }

  // No cached anime found, make request
  console.log('Requesting anime ' + id)
  return axios
    .get(baseUrl + '/anime/' + id)
    .then(response => {
      // Anime found, cache it
      db.insertAnime(response.data)

      return response.data
    })
    .catch(err => {
      console.error(err.message)
      return null
    })
}
