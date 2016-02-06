'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = function index (req, res, next) {
  models.platform.findOneAndRemove(req.query.where, (err, model) => {
    if (err) return next(err)
    res.json(model)
  })
}
