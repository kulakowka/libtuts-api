'use strict'

const models = require('require-dir')('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.findOne(models.project, req)
  .then(res.json.bind(res))
  .catch(next)
}
