'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.comment.findOneAndRemove(req.query.where).exec()