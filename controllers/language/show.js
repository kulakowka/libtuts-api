'use strict'

const requireDir = require('require-dir')
const models = requireDir('../../models', {recurse: true})

const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.findOne(models.language, req)
  .then(language => {
    res.json({
      language
    })
  })
  .catch(next)
}
