'use strict'

const api = require('../../utils/api')
const marked = require('../../utils/marked')
const getDomainFromUrl = require('../../utils/getDomainFromUrl')

module.exports = (req, res) => {
  req.body.contentHtml = req.body.content ? marked(req.body.content) : ''
  if (req.body.sourceUrl) {
    let domain = getDomainFromUrl(req.body.sourceUrl)
    req.body.sourceDomain = domain
  }
  return api.update('tutorial', req)
}
