'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => {
  const condition = {
    name: req.body.name
  }
  return models.language.findOneAndUpdate(condition, req.body, {new: true, upsert: true}).exec()
}
