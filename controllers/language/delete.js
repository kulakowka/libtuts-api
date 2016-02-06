'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = function index (req, res, next) {
  models.language.findOneAndRemove(req.query.where)
  .exec()
  .then(res.json.bind(res))
  .catch(next)
}
