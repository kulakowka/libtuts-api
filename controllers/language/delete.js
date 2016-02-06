'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.language.findOneAndRemove(req.query.where).exec()
