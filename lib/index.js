const { URL, URLSearchParams } = require('url')

class LogFilter {
  constructor (req, filter) {
    this.req = req

    let host = req.headers['host']

    if (host.indexOf('http') < 0) {
      host = `http://${host}`
    }

    try {
      this.parsedUrl = new URL(req.url, host)
    } catch (err) {
      console.log(err)
    }

    this.filter = filter
  }

  // filterRequestParameters () {

  // }

  // filterEnvironment () {

  // }

  // Reconstructs a path with all sensitive GET parameters replaced.
  filterPath () {
    if (!this.parsedUrl) {
      return this.req.url
    }

    let path = this.parsedUrl.pathname
    let searchParams = new URLSearchParams(this.parsedUrl.searchParams)

    if (searchParams.keys().next().done) {
      return path
    }

    this.filter.forEach(key => {
      if (searchParams.get(key)) {
        searchParams.set(key, '[FILTERED]')
      }
    })

    return `${path}?${searchParams}`
  }
}

module.exports = LogFilter
