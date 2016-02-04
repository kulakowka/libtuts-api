'use strict'

const requireDir = require('require-dir')
const models = requireDir('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  api.findOne(models.tutorial, req)
  .then(tutorial => {
    res.json({
      tutorial
    })
  })
  .catch(next)
}