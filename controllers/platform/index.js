'use strict'

const models = require('require-dir')('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = (req, res) => api.find(models.platform, req)
