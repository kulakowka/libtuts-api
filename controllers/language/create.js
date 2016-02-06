'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = function index (req, res, next) {
  const condition = {
    name: req.body.name
  }
  models.language
  .findOneAndUpdate(condition, req.body, {new: true, upsert: true})
  .exec()
  .then(res.json.bind(res))
  .catch(next)
}
