const { URL, URLSearchParams } = require('url')

class LogFilter {
  constructor (req, filter) {
    this.req = req
    this.parsedUrl = new URL(req.url, req.headers['host'])
    this.filter = filter
  }

  // filterRequestParameters () {

  // }

  // filterEnvironment () {

  // }

  // Reconstructs a path with all sensitive GET parameters replaced.
  filterPath () {
    let path = this.parsedUrl.pathname
    let searchParams = new URLSearchParams(this.parsedUrl.searchParams)

    this.filter.forEach(key => {
      if (searchParams.get(key)) {
        searchParams.set(key, '[FILTERED]')
      }
    })

    return `${path}?${searchParams}`
  }
}

module.exports = LogFilter
