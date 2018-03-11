import config from 'lazy-config'
import { MongoClient } from 'mongodb'

class Database {
  constructor() {
    let self = this
    MongoClient.connect(config.mongo.url, this.link.bind(this))
  }

  link(err, client) {
    console.log('Connected to mongodb')
    let animeDB = client.db('anime')

    this.anime = animeDB.collection('anime')
  }

  insertAnime(anime) {
    this.anime.insertOne(anime)
  }

  findAnime(id) {
    return this.anime.findOne({ id })
  }

  deleteAnime(id) {
    this.anime.deleteOne({ id })
  }
}

export default new Database()
