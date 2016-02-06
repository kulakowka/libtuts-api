'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => {
  const condition = {
    name: req.body.name,
    platform: req.body.platform
  }
  return models.project.findOneAndUpdate(condition, req.body, {new: true, upsert: true}).exec()
}
