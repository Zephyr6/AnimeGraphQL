const { getEnvVar } = require('env-utils')

function lazyGetEnvVar() {
  return () => getEnvVar(...arguments)
}

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  isDevelopment,

  port: lazyGetEnvVar('GRAPHQL_PORT'),

  api: {
    // docs: https://jikan.docs.apiary.io/
    anime: {
      baseUrl: lazyGetEnvVar('ANIME_BASE_URL')
    }
  },

  mongo: {
    url: lazyGetEnvVar('MONGO_URL')
  }
}
