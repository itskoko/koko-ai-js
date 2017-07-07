const https = require('https')

module.exports = class Tracker {
  constructor(options) {
    this.auth = options.auth
  }

  async trackContent(options) {
    throw new Error('NOT IMPLEMENTED')
  }

  async trackFlag(options) {
    throw new Error('NOT IMPLEMENTED')
  }

  async trackModeration(options) {
    throw new Error('NOT IMPLEMENTED')
  }
}
