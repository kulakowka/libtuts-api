'use strict'

const models = require('require-dir')('../../models', {recurse: true})
const api = require('../../utils/api')
const marked = require('../../utils/marked')

module.exports = (req, res) => {
  req.body.contentHtml = req.body.content ? marked(req.body.content) : ''
  return api.update(models.tutorial, req)
}
