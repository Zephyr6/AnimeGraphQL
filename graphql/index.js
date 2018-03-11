import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
    type Query {
        anime(id: Int): Anime
        search(name: String): [AnimeResult]
    }

    type AnimeResult {
        id: Int
        url: String
        name: String
        type: String
        episode: Int
        score: Float
        aired: Aired
        members: Int
        details: String
        rated: String
        image_url: String
    }

    type Anime {
        id: Int
        title: String
        synopsis: String
        url: String
        image_url: String
        title_english: String
        title_japanese: String
        episode: Int
        status: String
        airing: Boolean
        aired_string: String
        aired: Aired
        premiered: String
        broadcast: String
        producers: [Producer]
        licensors: [Producer]
        studios: [Producer]
        genres: [Genre]
        duration: String
        rating: String
        ranked: Int
        popularity: Int
        favorites: Int
        members: Int
        background: String
        related: Related
        opening_theme: [Track]
        ending_theme: [Track]
    }

    type Aired {
        from: String
        to: String
    }

    type Score {
        score: Float
        score_by: Int
    }

    type Producer {
        id: Int
        name: String
        url: String
    }

    type Genre {
        id: Int
        tag: String
        url: String
    }

    type Related {
        adaptation: [RelatedItem]
        sequel: [RelatedItem]
        other: [RelatedItem]
    }

    type RelatedItem {
        id: Int
        type: String
        name: String
        url: String
    }

    type Track {
        track: String
        by: String
        duration: [TrackDuration]
    }

    type TrackDuration {
        from: Int
        to: Int
    }
`
const PORT = 3001

const app = express()

// docs: https://github.com/assintates/mikan
const baseUrl = 'https://initiate.host'
const resolvers = {
  Query: {
    anime: async (root, args) => {
      let { id } = args

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

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: makeExecutableSchema({ typeDefs, resolvers }) })
)
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) // if you want GraphiQL enabled

app.listen(PORT)
