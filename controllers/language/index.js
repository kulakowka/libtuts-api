'use strict'

const requireDir = require('require-dir')
const models = requireDir('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.find(models.language, req)
  .then(languages => res.json(languages))
  .catch(next)
}
