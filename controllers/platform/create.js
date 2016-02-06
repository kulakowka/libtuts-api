'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = function index (req, res, next) {
  models.platform.findOneAndUpdate(req.query.where, req.body, {new: true, upsert: true}, (err, model) => {
    if (err) return next(err)
    res.json(model)
  })
}
