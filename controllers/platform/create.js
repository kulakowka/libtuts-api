'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => {
  const condition = {
    name: req.body.name
  }
  return models.platform.findOneAndUpdate(condition, req.body, {new: true, upsert: true}).exec()
}
