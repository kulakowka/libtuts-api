'use strict'

const models = require('require-dir')('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.findOne(models.platform, req)
  .then(platform => {
    res.json(platform)
  })
  .catch(next)
}
