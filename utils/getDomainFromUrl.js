'use strict'

const _url = require('url')

module.exports = function getDomainFromUrl (url) {
  let urlObject = _url.parse(url)
  return urlObject.hostname && urlObject.hostname.replace(/^www./i, '')
}
