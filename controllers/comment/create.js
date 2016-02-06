'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.comment.create(req.body).exec()
