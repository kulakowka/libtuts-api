'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.platform.findOneAndRemove(req.query.where).exec()
