'use strict'

const requireDir = require('require-dir')
const router = require('express').Router()
const path = require('path')
const controllers = requireDir('../controllers', {recurse: true})

const resources = Object.keys(controllers)
const methods = {
  login: 'post', // hack
  index: 'get',
  show: 'get',
  create: 'post',
  update: 'put',
  delete: 'delete'
}
resources.forEach(resource => {
  const actions = Object.keys(controllers[resource])
  actions.forEach(action => {
    const pathname = path.join('/', resource, action)
    const handler = controllers[resource][action]
    const method = methods[action]
    router[method](pathname, (req, res, next) => {
      handler(req, res, next)
      .then(res.json.bind(res))
      .catch(next)
    })
  })
})

module.exports = router
