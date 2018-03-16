import bodyParser from 'body-parser'
import config from 'lazy-config'
import cors from 'cors'
import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const typeDefs = `
    type Query {
        anime(id: Int): Anime
        search(name: String): [AnimeResult]
    }

    type AnimeResult {
        id: Int
        url: String
        title: String
        type: String
        episodes: Int
        score: Float
        aired: Aired
        members: Int
        details: String
        rated: String
        image_url: String
    }

    type Anime {
        mal_id: Int
        title: String
        synopsis: String
        url: String
        image_url: String
        title_english: String
        title_japanese: String
        episodes: Int
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
        opening_theme: [String]
        ending_theme: [String]
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

const app = express()

// bodyParser is needed just for POST.
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress({ schema: makeExecutableSchema({ typeDefs, resolvers }) })
)
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) // if you want GraphiQL enabled

app.listen(config.port)
console.log('Server started on ' + config.port)
