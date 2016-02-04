'use strict'

const requireDir = require('require-dir')
const models = requireDir('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  let request = {
    query: {
      select: 'id'
    },
    params: {
      slug: req.params.platform
    }
  }
  api.findOne(models.platform, request)
  .then(platform => {
    req.params.platform = platform.id
    return api.findOne(models.project, req)
    .then(project => {
      res.json({
        project
      })
    })
    // .catch(next)
  })
  .catch(next)
}
