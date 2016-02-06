'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = function index (req, res, next) {
  models.platform
  .findOneAndUpdate(req.query.where, req.body, {new: true})
  .exec()
  .then(res.json.bind(res))
  .catch(next)
}
