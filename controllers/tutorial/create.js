'use strict'

const models = require('require-dir')('../../models', {recurse: true})

module.exports = (req, res) => models.tutorial.create(req.body).exec()
