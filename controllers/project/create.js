'use strict'

const requireDir = require('require-dir')
const models = requireDir('../../models', {recurse: true})
const api = require('../../utils/api')

module.exports = function index (req, res, next) {
  let slug = req.body.name
  console.log(req.body)
  models.project.findOneAndUpdate({slug}, req.body, {new: true, upsert: true}, (err, project) => {
    if (err) return next(err)
    res.json(project)
  })
}
