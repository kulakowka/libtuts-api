'use strict'

const models = require('require-dir')('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.find(models.platform, req)
  .then(platforms => res.json(platforms))
  .catch(next)
}
