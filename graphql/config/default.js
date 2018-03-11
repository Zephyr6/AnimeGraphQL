const { getEnvVar } = require('env-utils')

function lazyGetEnvVar() {
  return () => getEnvVar(...arguments)
}

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  isDevelopment,

  port: lazyGetEnvVar('GRAPHQL_PORT'),

  api: {
    // docs: https://github.com/assintates/mikan
    mikan: {
      baseUrl: lazyGetEnvVar('MIKAN_BASE_URL')
    }
  }
}
