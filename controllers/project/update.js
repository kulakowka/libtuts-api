'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.project.findOneAndUpdate(req.query.where, req.body, {new: true}).exec()
