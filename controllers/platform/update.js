'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.platform.findOneAndUpdate(req.query.where, req.body, {new: true}).exec()
