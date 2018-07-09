const { URLSearchParams } = require('url')

class LogFilter {
  constructor (req, filter) {
    this.req = req
    this.filter = filter
  }

  // filterRequestParameters () {

  // }

  // filterEnvironment () {

  // }

  // Reconstructs a path with all sensitive GET parameters replaced.
  filterPath () {
    if (this.req.url.indexOf('?') < 0) {
      return this.req.url
    }

    let parts = this.req.url.split('?')

    let path = parts[0]
    let searchParams = new URLSearchParams(parts[1])

    this.filter.forEach(key => {
      if (searchParams.get(key)) {
        searchParams.set(key, '[FILTERED]')
      }
    })

    return `${path}?${searchParams}`
  }
}

module.exports = LogFilter
