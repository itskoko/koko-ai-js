const assert = require('assert')
const https = require('https')
const http = require('http')
const url = require('url')

exports.Tracker = class Tracker {
  constructor(options) {
    assert.ok('auth' in options, 'options.auth not specified.')

    const endpoint = options.endpoint || 'https://api.koko.ai'
    const {protocol, host} = url.parse(endpoint)
    const method = 'POST'
    const headers = {
      'Authorization': options.auth,
      'Content-Type': 'application/json'
    }

    this.http = {http, https}[protocol.slice(0, -1)]
    this.params = {method, host, headers}
  }

  trackContent(options) {
    return this.request('/track/content', options)
  }

  trackFlag(options) {
    return this.request('/track/flag', options)
  }

  trackModeration(options) {
    return this.request('/track/moderation', options)
  }

  request(path, options) {
    return new Promise((resolve, reject) => {
      const params = Object.assign({path}, this.params)

      this.http.request(params)
        .on('error', reject)
        .on('response', onresponse)
        .end(JSON.stringify(options))

      function onresponse(response) {
        let json = ''

        response.setEncoding('utf8')
        response.on('data', data => json += data)
        response.on('end', () => {
          try {
            const data = JSON.parse(json)

            'error' in data
              ? reject(new Error(data.error.join('\n')))
              : resolve(data)
          }

          catch (e) {
            const message = http.STATUS_CODES[response.statusCode]
            reject(new Error(message))
          }
        })
      }
    })
  }
}
