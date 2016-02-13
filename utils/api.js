'use strict'

const models = require('require-dir')('../models', {recurse: true})

const defaultLimit = 30

const api = {
  find (model, req) {
    let query = req.query
    let q = models[model].find()
    if (query.where) q.where(req.query.where)
    if (query.populate) query.populate.forEach(field => q.populate(field))
    if (query.select) query.select.forEach(field => q.select(field))
    if (query.sort) q.sort(query.sort)
    q.limit(query.limit || defaultLimit)
    if (query.skip) q.limit(query.skip)
    return q.exec()
  },

  findOne (model, req) {
    let query = req.query
    let q = models[model].findOne()
    if (query.where) q.where(req.query.where)
    if (query.populate) query.populate.forEach(field => q.populate(field))
    if (query.select) query.select.forEach(field => q.select(field))
    return q.exec()
  },

  create (model, req) {
    let query = req.query
    let q = models[model]
    if (query.populate) query.populate.forEach(field => q.populate(field))
    return q.create(req.body)
  },

  update (model, req) {
    return models[model].findOneAndUpdate(req.query.where, req.body, {new: true})
  },

  delete (model, req) {
    return models[model].findOneAndRemove(req.query.where)
  }
}

module.exports = api
