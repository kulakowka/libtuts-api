'use strict'

const requireDir = require('require-dir')
const models = requireDir('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.find(models.tutorial, req)
  .then(tutorials => res.json(tutorials))
  .catch(next)
}
