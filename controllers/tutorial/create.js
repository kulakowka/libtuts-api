'use strict'

const models = require('require-dir')('../../models', {recurse: true})
const api = require('../../utils/api')
const marked = require('../../utils/marked')

module.exports = (req, res) => {
  if (req.body.content) req.body.contentHtml = marked(req.body.content)
  return api.create(models.tutorial, req)
}
